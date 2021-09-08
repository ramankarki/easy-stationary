import { useEffect } from 'react';

let callBackFunc;

function handleIntersections(entries, observer) {
  entries.forEach((entry) => {
    // if element is near viewport, call func
    if (entry.isIntersecting) callBackFunc();
  });
}

export function useIntersection(elem, callback) {
  // change scope to call later
  callBackFunc = callback;

  useEffect(() => {
    const target = elem.current;
    let observer = new IntersectionObserver(handleIntersections, {
      rootMargin: '350px',
      threshold: '0',
    });
    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, []);
}
