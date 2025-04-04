import { useState, useEffect } from 'react';

const useBreakpoints = () => {
  const [screenSize, setScreenSize] = useState({
    mobile: false,
    tablet: false,
    desktop: false,
  });

  const handleResize = () => {
    const width = window.innerWidth;
    setScreenSize({
      mobile: width < 768,
      tablet: width >= 768 && width < 1024,
      desktop: width >= 1024,
    });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

export default useBreakpoints;
