import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Menu, X, LogIn, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  isScrolled: boolean;
}

const Header = ({ isScrolled }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) => 
    `relative px-3 py-2 text-sm md:text-base font-medium transition-colors
    ${isActive 
      ? 'text-primary-700 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary-500' 
      : 'text-gray-700 hover:text-primary-600'
    }`;

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 10 }}
              transition={{ duration: 0.2 }}
            >
              <BookOpen className="h-8 w-8 text-primary-600" />
            </motion.div>
            <span className="font-nunito font-bold text-xl md:text-2xl text-primary-700">
              EduPlay
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-4">
            <NavLink to="/" className={navLinkClasses} end>Home</NavLink>
            <NavLink to="/games" className={navLinkClasses}>Games</NavLink>
            <NavLink to="/activities" className={navLinkClasses}>Activities</NavLink>
            <NavLink to="/testimonials" className={navLinkClasses}>Testimonials</NavLink>
            <NavLink to="/about" className={navLinkClasses}>About Us</NavLink>
            <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
          </nav>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/dashboard" 
                  className="flex items-center text-sm font-medium text-primary-700 hover:text-primary-800 transition-colors"
                >
                  <User className="h-4 w-4 mr-1" />
                  {user?.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm rounded-full bg-white text-primary-600 border border-primary-200 hover:bg-primary-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-sm rounded-full bg-white text-primary-600 border border-primary-200 hover:bg-primary-50 transition-colors"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="px-4 py-3 space-y-1">
            <NavLink 
              to="/" 
              className={({isActive}) => `block py-2 px-4 ${isActive ? 'text-primary-600 font-medium' : 'text-gray-700'}`}
              end
            >
              Home
            </NavLink>
            <NavLink 
              to="/games" 
              className={({isActive}) => `block py-2 px-4 ${isActive ? 'text-primary-600 font-medium' : 'text-gray-700'}`}
            >
              Games
            </NavLink>
            <NavLink 
              to="/activities" 
              className={({isActive}) => `block py-2 px-4 ${isActive ? 'text-primary-600 font-medium' : 'text-gray-700'}`}
            >
              Activities
            </NavLink>
            <NavLink 
              to="/testimonials" 
              className={({isActive}) => `block py-2 px-4 ${isActive ? 'text-primary-600 font-medium' : 'text-gray-700'}`}
            >
              Testimonials
            </NavLink>
            <NavLink 
              to="/about" 
              className={({isActive}) => `block py-2 px-4 ${isActive ? 'text-primary-600 font-medium' : 'text-gray-700'}`}
            >
              About Us
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({isActive}) => `block py-2 px-4 ${isActive ? 'text-primary-600 font-medium' : 'text-gray-700'}`}
            >
              Contact
            </NavLink>
            
            <div className="pt-2 mt-3 border-t border-gray-200">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="block py-2 px-4 text-primary-600 font-medium"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block py-2 px-4 text-gray-700 w-full text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block py-2 px-4 text-gray-700"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block py-2 px-4 font-medium text-primary-600"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;