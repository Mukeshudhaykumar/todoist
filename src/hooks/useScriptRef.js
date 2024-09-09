// src/hooks/useScriptRef.js
import { useRef, useEffect } from 'react';

/**
 * Hook to manage a script reference and clean up on unmount.
 * @returns {React.MutableRefObject} - A ref object to hold the script reference.
 */
const useScriptRef = () => {
  const scriptRef = useRef(null);

  useEffect(() => {
    const currentScriptRef = scriptRef.current;

    return () => {
      if (currentScriptRef) {
        document.body.removeChild(currentScriptRef);
      }
    };
  }, []);

  return scriptRef;
};

export default useScriptRef;
