/**
 * Gemini AI Service
 * Manages communication with Google Gemini API with fallback support
 */

interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
  }>;
}

export class GeminiService {
  private apiKeys: string[];
  private currentKeyIndex: number = 0;
  private readonly MODEL = 'gemini-2.0-flash-exp'; // Try 2.0 first, fallback to 1.5-pro if needed
  private readonly BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

  constructor() {
    // Load all API keys from environment
    this.apiKeys = [
      import.meta.env.VITE_GEMINI_API_KEY_1,
      import.meta.env.VITE_GEMINI_API_KEY_2,
      import.meta.env.VITE_GEMINI_API_KEY_3,
      import.meta.env.VITE_GEMINI_API_KEY_4,
    ].filter(key => key); // Remove undefined keys

    if (this.apiKeys.length === 0) {
      console.error('No Gemini API keys found in environment variables');
    }
  }

  /**
   * Send a message to Gemini AI with automatic fallback
   */
  async sendMessage(
    messages: GeminiMessage[],
    systemPrompt?: string
  ): Promise<string> {
    let lastError: Error | null = null;

    // Try each API key in sequence
    for (let attempt = 0; attempt < this.apiKeys.length; attempt++) {
      try {
        const apiKey = this.apiKeys[this.currentKeyIndex];
        const response = await this.makeRequest(apiKey, messages, systemPrompt);
        
        // Success! Return the response
        return response;
      } catch (error) {
        lastError = error as Error;
        console.warn(
          `API Key ${this.currentKeyIndex + 1} failed:`,
          error instanceof Error ? error.message : error
        );

        // Move to next API key
        this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length;
      }
    }

    // All keys failed
    throw new Error(
      `All Gemini API keys exhausted. Last error: ${lastError?.message || 'Unknown error'}`
    );
  }

  /**
   * Make actual API request to Gemini
   */
  private async makeRequest(
    apiKey: string,
    messages: GeminiMessage[],
    systemPrompt?: string
  ): Promise<string> {
    const url = `${this.BASE_URL}/${this.MODEL}:generateContent?key=${apiKey}`;

    // Build request body
    const contents = [...messages];
    
    // Add system instructions if provided
    const requestBody: any = {
      contents,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
      ],
    };

    // Add system instruction if provided
    if (systemPrompt) {
      requestBody.systemInstruction = {
        parts: [{ text: systemPrompt }],
      };
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Gemini API error (${response.status}): ${
          errorData.error?.message || response.statusText
        }`
      );
    }

    const data: GeminiResponse = await response.json();

    // Extract text from response
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error('No response text from Gemini API');
    }

    return text;
  }

  /**
   * Get current active API key index (for debugging)
   */
  getCurrentKeyIndex(): number {
    return this.currentKeyIndex;
  }

  /**
   * Manually set API key index (for testing)
   */
  setKeyIndex(index: number): void {
    if (index >= 0 && index < this.apiKeys.length) {
      this.currentKeyIndex = index;
    }
  }
}

// Singleton instance
export const geminiService = new GeminiService();

