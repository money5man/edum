import { Link } from 'react-router-dom';
import { BookOpen, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-7 w-7 text-white" />
              <span className="font-nunito font-bold text-xl text-white">
                KidsGeniusLab
              </span>
            </Link>
            <p className="text-primary-100 text-sm leading-relaxed max-w-xs">
              Inspiring children to learn through play with our educational games and activities. Making learning fun since 2023.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-nunito font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/games" className="text-primary-200 hover:text-white text-sm transition-colors">
                  Educational Games
                </Link>
              </li>
              <li>
                <Link to="/activities" className="text-primary-200 hover:text-white text-sm transition-colors">
                  Learning Activities
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-primary-200 hover:text-white text-sm transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/subscription" className="text-primary-200 hover:text-white text-sm transition-colors">
                  Subscription Plans
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-200 hover:text-white text-sm transition-colors">
                  About Our Mission
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-nunito font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-primary-200 hover:text-white text-sm transition-colors">
                  Parents Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-200 hover:text-white text-sm transition-colors">
                  Teaching Resources
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-200 hover:text-white text-sm transition-colors">
                  Blog & Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-200 hover:text-white text-sm transition-colors">
                  Educational Research
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-200 hover:text-white text-sm transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-nunito font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-primary-100 text-sm">
                123 Learning Lane
              </li>
              <li className="text-primary-100 text-sm">
                Education City, EC 12345
              </li>
              <li className="text-primary-100 text-sm">
                support@kidsgeniuslab.com
              </li>
              <li className="text-primary-100 text-sm">
                +1 (555) 123-4567
              </li>
            </ul>
            <Link to="/contact" className="inline-block mt-4 px-4 py-2 text-sm rounded-full bg-primary-700 text-white hover:bg-primary-600 transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-8 pt-6 text-sm text-primary-300 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {currentYear} KidsGeniusLab. All rights reserved.</p>
          <div className="flex space-x-4 mt-3 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;