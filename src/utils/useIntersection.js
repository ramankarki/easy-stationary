import { useEffect } from 'react';

let callBackFunc;

function handleIntersections(entries, observer) {
  entries.forEach((entry) => {
    // if element is near viewport, call func
    if (entry.isIntersecting) callBackFunc();
  });
}

export function useIntersection(elem, callback, dependency) {
  // change scope to call later
  callBackFunc = callback;

  useEffect(() => {
    const target = elem.current;
    if (!target) return;

    let observer = new IntersectionObserver(handleIntersections, {
      rootMargin: '700px',
      threshold: '0',
    });

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [elem, dependency]);
}
