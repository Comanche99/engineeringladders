import { useState, useCallback, useEffect } from 'react';
import { Framework } from '../types/index';
import { createEmptyFramework } from '../utils/framework';

const STORAGE_KEY = 'engineering-framework-builder-state';

export const useFrameworkStorage = (initialFramework?: Framework) => {
  const [framework, setFramework] = useState<Framework>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load framework from localStorage:', error);
    }
    return initialFramework || createEmptyFramework();
  });

  const [isSaved, setIsSaved] = useState(true);

  // Persist framework to localStorage whenever it changes
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(framework));
        setIsSaved(true);
      } catch (error) {
        console.error('Failed to save framework to localStorage:', error);
      }
    }, 500); // Debounce saves by 500ms

    return () => clearTimeout(timer);
  }, [framework]);

  const updateFramework = useCallback((updates: Partial<Framework>) => {
    setFramework(prev => ({
      ...prev,
      ...updates,
      updatedAt: Date.now()
    }));
    setIsSaved(false);
  }, []);

  const resetToLastSaved = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFramework(JSON.parse(stored));
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Failed to reset to last saved:', error);
    }
  }, []);

  const clearFramework = useCallback(() => {
    setFramework(createEmptyFramework());
    localStorage.removeItem(STORAGE_KEY);
    setIsSaved(true);
  }, []);

  return {
    framework,
    isSaved,
    updateFramework,
    resetToLastSaved,
    clearFramework,
    setFramework
  };
};
