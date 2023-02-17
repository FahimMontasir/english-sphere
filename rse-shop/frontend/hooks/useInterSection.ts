import { useEffect, RefObject } from 'react';

type IntersectionCallback = () => void;

function useIntersection(
  elem: RefObject<Element>,
  callback: IntersectionCallback
) {
  let listenerCallbacks = new WeakMap<Element, IntersectionCallback>();
  let observer: IntersectionObserver | undefined;

  function handleIntersections(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (listenerCallbacks.has(entry.target)) {
        let cb = listenerCallbacks.get(entry.target);

        if (cb && (entry.isIntersecting || entry.intersectionRatio > 0)) {
          observer?.unobserve(entry.target);
          listenerCallbacks.delete(entry.target);
          cb();
        }
      }
    });
  }

  function getIntersectionObserver() {
    if (observer === undefined) {
      observer = new IntersectionObserver(handleIntersections, {
        rootMargin: '100px',
        threshold: 0.15
      });
    }
    return observer;
  }

  useEffect(() => {
    let target = elem.current;
    if (target !== null) {
      let observer = getIntersectionObserver();
      listenerCallbacks.set(target, callback);
      observer.observe(target);
      return () => {
        listenerCallbacks.delete(target as Element);
        observer.unobserve(target as Element);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elem, callback]);
}

export default useIntersection;
