import { useEffect, useRef } from "react";

type InfiniteScrollParams = {
  hasMore: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
  threshold?: number;
};

export function useInfiniteScroll<T extends HTMLElement>({
  hasMore,
  onLoadMore,
  rootMargin = "0px 0px 200px 0px",
  threshold = 0,
}: InfiniteScrollParams) {
  const loaderRef = useRef<T | null>(null);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore) {
            onLoadMore();
          }
        });
      },
      { root: null, rootMargin, threshold }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasMore, onLoadMore, rootMargin, threshold]);

  return loaderRef;
}
