import { useEffect, useState } from "react";

const LOG_KEY = "fetch-logs";

function logToLocalStorage(entry) {
  try {
    const current = JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
    current.push(entry);
    localStorage.setItem(LOG_KEY, JSON.stringify(current));
  } catch (e) {
    console.error("Failed to write fetch log", e);
  }
}

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);

      const logEntry = {
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

        const json = await res.json();

        if (!cancelled) {
          setData(json);
        }
      } catch (e) {
        logEntry.error = e.message;
        if (!cancelled) {
          setError(e);
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
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
}
