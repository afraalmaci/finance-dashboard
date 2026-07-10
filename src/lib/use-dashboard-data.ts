"use client";

import { useEffect, useState } from "react";
import { DashboardData } from "@/src/types/portfolio";

// Return shape of the hook: data, loading, and error states
interface UseDashboardDataResult {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
}

// Fetches dashboard data from the mock API route on mount
export function useDashboardData(): UseDashboardDataResult {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/dashboard-data");

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const json: DashboardData = await response.json();

        if (!isCancelled) {
          setData(json);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    // Cleanup: prevents setting state if the component unmounts mid-fetch
    return () => {
      isCancelled = true;
    };
  }, []);

  return { data, isLoading, error };
}