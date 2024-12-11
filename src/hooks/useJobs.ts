import { useState, useEffect } from 'react';
import { jobsApi } from '../api/client';
import type { Job } from '../types/job';

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const data = await jobsApi.getJobs();
        setJobs(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch jobs'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchJobs();
  }, []);

  const searchJobs = async (query: string) => {
    setIsLoading(true);
    try {
      const data = await jobsApi.searchJobs(query);
      setJobs(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to search jobs'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    jobs,
    isLoading,
    error,
    searchJobs,
  };
}