import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component will scroll the window to the top whenever the route changes
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash in the URL (like /#products), don't scroll to top
    if (hash) {
      // Find the element with the ID matching the hash and scroll to it
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    
    // Otherwise, scroll to the top of the page
    window.scrollTo(0, 0);
  }, [pathname, hash]); // Re-run this effect when the route changes

  return null; // This component doesn't render anything
};

export default ScrollToTop;