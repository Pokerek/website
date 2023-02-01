import { useState, useEffect } from "react";

export function useFetch<T>(url: string): [T | null, boolean, Error | null] {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Something went wrong. Please reload the page.");
        }
        return response.json();
      })
      .then((data: T) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [url]);

  return [data, isLoading, error];
}
