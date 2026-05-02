import * as React from 'react';

// Polyfill for useEffectEvent which is missing in React 19 stable but expected by Sanity
const useEffectEvent = (fn) => {
  const ref = React.useRef(fn);
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useLayoutEffect(() => {
      ref.current = fn;
    });
  }
  return React.useCallback((...args) => {
    return ref.current?.(...args);
  }, []);
};

// Re-export everything from React
export * from 'react';
// Add the missing hook
export { useEffectEvent };
// Default export
export default React;
