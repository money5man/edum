import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from './Header';
import Footer from './Footer';
import AnimatedBackground from './AnimatedBackground';

const Layout = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll position for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <Header isScrolled={isScrolled} />
      <main className="flex-grow z-10 relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
