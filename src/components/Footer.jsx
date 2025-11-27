import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white">Growth</span>
            <span className="text-white">Hub</span>
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Empowering creators, developers, and learners through articles & insights.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/about" className="hover:text-white transition">About</a></li>
            <li><a href="/search" className="hover:text-white transition">Blog</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Portfolio / Explore */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://amirsohelsardar.github.io/portfolioweb/" target="_blank" className="hover:text-white transition">
                Portfolio
              </a>
            </li>
            <li>
              <a href="" className="hover:text-white transition">
                Services
              </a>
            </li>
            <li>
              <a href="" className="hover:text-white transition">
                Projects
              </a>
            </li>
          </ul>
        </div>

        {/* Social + Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Connect</h3>
          <div className="flex space-x-4 text-xl">
            <a href="https://www.facebook.com/amirsohel.sardar.3/" className="hover:text-white transition"><FaFacebookF /></a>
            <a href="https://www.instagram.com/amirsohelsardar786/?next=%2F" className="hover:text-white transition"><FaInstagram /></a>
            <a href="https://x.com/AmirSohel9083" className="hover:text-white transition"><FaTwitter /></a>
            <a href="https://www.linkedin.com/in/amir-sohel-sardar-735698243/" className="hover:text-white transition"><FaLinkedinIn /></a>
            <a href="https://www.youtube.com/@DSA_MERN" className="hover:text-white transition"><FaYoutube /></a>
            <a href="https://github.com/AmirSohelSardar" className="hover:text-white transition"><FaGithub /></a>
          </div>

          <div className="mt-4 text-sm text-gray-400">
            <p>Email: sohelamirsohel786@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Growth Hub. All rights reserved.
      </div>
    </footer>
  );
}