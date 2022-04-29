//@ts-nocheck
import { useState, useEffect } from 'react';
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(undefined);
  window.onresize = function () {
    setSize();
  };
  function setSize() {
    
    let isMobile = !(document.documentElement.offsetWidth > 768);
    setIsMobile(isMobile);
  }
  useEffect(() => {
    setSize();
  }, []);

  return isMobile;
};

export default useIsMobile;
