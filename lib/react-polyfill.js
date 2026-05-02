const React = require('react');

// Polyfill for useEffectEvent which is missing in React 19 stable but expected by Sanity
const useEffectEvent = (fn) => {
  const ref = React.useRef(fn);
  if (typeof window !== 'undefined') {
    React.useLayoutEffect(() => {
      ref.current = fn;
    });
  }
  return React.useCallback((...args) => {
    return ref.current?.(...args);
  }, []);
};

// Re-export everything from React using CommonJS
module.exports = {
  ...React,
  useEffectEvent,
  __esModule: true,
  default: React,
};
