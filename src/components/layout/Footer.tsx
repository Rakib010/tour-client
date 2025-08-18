import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import logo from "../../assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo + Text */}
        <div className="flex items-center gap-3 ">
          <Link to="/">
            <img
              src={logo}
              alt="Wanderlust Tours Logo"
              className="h-16 w-auto"
            />
          </Link>
          <span className="text-sm text-gray-400">
            © {new Date().getFullYear()} Wanderlust Tours
          </span>
        </div>

        {/* Social Links */}
        <div className="flex space-x-4">
          <Link
            to="#"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <FaFacebook className="h-5 w-5" />
          </Link>
          <Link
            to="#"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram className="h-5 w-5" />
          </Link>
          <Link
            to="#"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
