import { useEffect, useState } from 'react';
import { fetchJson } from '../lib/api';

export function useApiResource<T>(path: string, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let aborted = false;

    const load = async () => {
      setLoading(true);
      try {
        const payload = await fetchJson<T>(path);
        if (!aborted) {
          setData(payload);
          setError(null);
        }
      } catch (err) {
        if (!aborted) {
          setError(err instanceof Error ? err.message : 'Unable to load data');
        }
      } finally {
        if (!aborted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      aborted = true;
    };
  }, [path]);

  return { data, loading, error } as const;
}
