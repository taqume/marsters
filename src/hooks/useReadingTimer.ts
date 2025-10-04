import { useEffect, useRef } from 'react';
import { useReadingHistoryStore } from '@stores/readingHistoryStore';

/**
 * Custom hook to track reading time for an article
 * Updates the reading history every 10 seconds
 */
export const useReadingTimer = (articleId: number | null, isReading: boolean) => {
  const { updateReadingTime } = useReadingHistoryStore();
  const startTimeRef = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!articleId || !isReading) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    startTimeRef.current = Date.now();

    // Update reading time every 10 seconds
    intervalRef.current = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
      if (elapsedSeconds >= 10) {
        updateReadingTime(articleId, elapsedSeconds);
        startTimeRef.current = Date.now();
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        // Save any remaining time when component unmounts
        const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
        if (elapsedSeconds > 0) {
          updateReadingTime(articleId, elapsedSeconds);
        }
        clearInterval(intervalRef.current);
      }
    };
  }, [articleId, isReading, updateReadingTime]);
};
