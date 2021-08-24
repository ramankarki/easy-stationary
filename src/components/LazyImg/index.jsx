import { useState, useRef } from 'react';

import { useIntersection } from './insersectionObserver';
import ShimmerLoading from '../ShimmerLoading';
import ErrorBoundary from '../ErrorBoundary';

const LazyImg = (props) => {
  const { src, alt } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  // set isInView to true when it is in viewport
  useIntersection(imgRef, setIsInView);

  const handleOnLoad = () => {
    setIsLoaded(true);
  };

  // when it is near view port, return image and loading component,
  // image onLoad, unmount loading component
  return (
    <ErrorBoundary>
      <div
        ref={imgRef}
        style={{ height: '100%', width: '100%', position: 'relative' }}
      >
        {isInView && (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={handleOnLoad}
            style={{ position: 'absolute', width: '100%', height: 'auto' }}
          />
        )}
        {
          // when image loads, unmount shimmer loading
          !isLoaded && <ShimmerLoading />
        }
      </div>
    </ErrorBoundary>
  );
};

export default LazyImg;
