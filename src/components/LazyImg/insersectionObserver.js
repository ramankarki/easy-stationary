import { useEffect } from 'react';

// useState from LazyImg
let setIsInView;

// once the image is near the viewport, setIsInView and stop observing.
function handleIntersections(entries, observer) {
  entries.forEach((entry) => {
    // if element is near viewport, set to true
    if (entry.isIntersecting) {
      setIsInView(true);
      observer.unobserve(entry.target);
    }
  });
}

export function useIntersection(elem, callback) {
  setIsInView = callback;

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
  }, [elem]);
}
