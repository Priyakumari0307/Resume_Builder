import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    closeMobileMenu();
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <nav className="fixed top-12 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-6xl animate-[slideDown_0.6s_ease-out]">
      <div className="flex justify-between items-center px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl transition-all duration-300 hover:bg-white/8 hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] bg-gradient-to-br from-white/8 to-white/2">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center transition-transform duration-300 hover:scale-105"
          onClick={closeMobileMenu}
        >
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Resume.
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="text-white/80 hover:text-white font-medium text-base transition-all duration-300"
          >
            Home
          </a>

          <a
            href="#features"
            onClick={(e) => handleNavClick(e, 'features')}
            className="text-white/80 hover:text-white font-medium text-base transition-all duration-300"
          >
            Features
          </a>

          <a
            href="#testimonials"
            onClick={(e) => handleNavClick(e, 'testimonials')}
            className="text-white/80 hover:text-white font-medium text-base transition-all duration-300"
          >
            Testimonials
          </a>

          {user ? (
            <Link
              to="/app"
              className="relative text-white font-semibold text-base px-6 py-3 bg-gradient-to-r from-blue-600/70 to-blue-700/70 rounded-full shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30 hover:from-blue-600/80 hover:to-blue-700/80 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
              <span className="relative">Dashboard</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-white/80 hover:text-white font-medium text-base transition-all duration-300"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div
          className={`md:hidden flex flex-col cursor-pointer space-y-1 z-50 ${isMobileMenuOpen ? 'space-y-0' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span className={`w-6 h-0.5 bg-white/80 rounded-sm transition-all duration-300 origin-center ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white/80 rounded-sm transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white/80 rounded-sm transition-all duration-300 origin-center ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white/5 backdrop-blur-xl border border-white/10 border-t-0 rounded-b-3xl p-5 mt-0.5 shadow-2xl transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible animate-[slideDownMobile_0.3s_ease-out]' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col space-y-4">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="text-white/80 hover:text-white font-medium text-lg px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/10 text-center"
          >
            Home
          </a>

          <a
            href="#features"
            onClick={(e) => handleNavClick(e, 'features')}
            className="text-white/80 hover:text-white font-medium text-lg px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/10 text-center"
          >
            Features
          </a>

          <a
            href="#testimonials"
            onClick={(e) => handleNavClick(e, 'testimonials')}
            className="text-white/80 hover:text-white font-medium text-lg px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/10 text-center"
          >
            Testimonials
          </a>

          {user ? (
            <Link
              to="/app"
              className="text-white font-semibold text-lg px-6 py-3.5 bg-gradient-to-r from-blue-600/70 to-blue-700/70 rounded-full shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:from-blue-600/80 hover:to-blue-700/80 text-center mt-2"
              onClick={closeMobileMenu}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login?state=signup"
              className="text-white font-semibold text-lg px-6 py-3.5 bg-gradient-to-r from-blue-600/70 to-blue-700/70 rounded-full shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:from-blue-600/80 hover:to-blue-700/80 text-center mt-2"
              onClick={closeMobileMenu}
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @keyframes slideDownMobile {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;