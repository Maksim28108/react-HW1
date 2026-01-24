import { useEffect, useMemo, useState } from "react";

const LOG_KEY = "fetch-logs";

type FetchLogEntry = {
  url: string;
  options: {
    method: string;
    body: unknown | null;
  };
  startedAt: string;
  finishedAt?: string;
  status?: number;
  ok?: boolean;
  error?: string;
};

function logToLocalStorage(entry: FetchLogEntry) {
  try {
    const current: FetchLogEntry[] = JSON.parse(
      localStorage.getItem(LOG_KEY) || "[]",
    );
    current.push(entry);
    localStorage.setItem(LOG_KEY, JSON.stringify(current));
  } catch (e) {
    console.error("Failed to write fetch log", e);
  }
}

function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  try {
    return JSON.stringify(e);
  } catch {
    return "Unknown error";
  }
}

export function useFetch<T = unknown>(
  url: string | null | undefined,
  options: RequestInit = {},
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(url));
  const [error, setError] = useState<string | null>(null);

  const optionsKey = useMemo(() => JSON.stringify(options), [options]);

  useEffect(() => {
    if (!url) return;

    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);

      const logEntry: FetchLogEntry = {
        url,
        options: {
          method: options.method || "GET",
          body: options.body ?? null,
        },
        startedAt: new Date().toISOString(),
      };

      try {
        const res = await fetch(url, options);

        logEntry.status = res.status;
        logEntry.ok = res.ok;

        const json = (await res.json()) as T;

        if (!cancelled) {
          setData(json);
        }
      } catch (e: unknown) {
        const msg = getErrorMessage(e);
        logEntry.error = msg;

        if (!cancelled) {
          setError(msg);
        }
      } finally {
        logEntry.finishedAt = new Date().toISOString();
        logToLocalStorage(logEntry);

        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [url, optionsKey]);

  return { data, loading, error };
}
