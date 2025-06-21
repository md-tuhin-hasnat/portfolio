"use client";

import { useState, useEffect, useCallback } from 'react';

const USAGE_LIMIT_KEY = 'contextChatUsage';
const USAGE_LIMIT_PERIOD_HOURS = 24;

export function useUsageLimit(limit) {
  const [usage, setUsage] = useState({ count: 0, lastReset: Date.now() });

  useEffect(() => {
    // This effect should only run on the client
    if (typeof window === 'undefined') return;

    try {
      const storedUsage = localStorage.getItem(USAGE_LIMIT_KEY);
      const now = Date.now();

      if (storedUsage) {
        const parsedUsage = JSON.parse(storedUsage);
        const hoursSinceLastReset = (now - parsedUsage.lastReset) / (1000 * 60 * 60);
        
        if (hoursSinceLastReset > USAGE_LIMIT_PERIOD_HOURS) {
          // Reset if period has passed
          const newUsage = { count: 0, lastReset: now };
          localStorage.setItem(USAGE_LIMIT_KEY, JSON.stringify(newUsage));
          setUsage(newUsage);
        } else {
          setUsage(parsedUsage);
        }
      } else {
        // Initialize if not present
        const newUsage = { count: 0, lastReset: now };
        localStorage.setItem(USAGE_LIMIT_KEY, JSON.stringify(newUsage));
        setUsage(newUsage);
      }
    } catch (error) {
      console.error("Could not access localStorage:", error);
    }
  }, []);

  const increment = useCallback(() => {
    setUsage(prevUsage => {
      const newCount = prevUsage.count + 1;
      const newUsage = { ...prevUsage, count: newCount };
       if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(USAGE_LIMIT_KEY, JSON.stringify(newUsage));
        } catch (error) {
          console.error("Could not write to localStorage:", error);
        }
      }
      return newUsage;
    });
  }, []);

  const limitReached = usage.count >= limit;

  return { count: usage.count, limit, limitReached, increment };
}
