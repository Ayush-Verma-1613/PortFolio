import React, { useState } from "react";
import { 
  Download, 
  Eye, 
  X, 
  Home, 
  User, 
  FolderOpen, 
  Code, 
  Mail,
  AlertCircle,
  Menu 
} from "lucide-react";

// Navigation Items Configuration
const navigationConfig = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Projects", href: "#projects", icon: FolderOpen },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Contact", href: "#contact", icon: Mail },
];

// NavLink Component
const NavLink = ({ item, onClick }) => {
  const IconComponent = item.icon;
  return (
    <li>
      <a 
        href={item.href}
        onClick={onClick}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
      >
        <IconComponent size={18} className="group-hover:scale-110 transition-transform" />
        <span>{item.name}</span>
      </a>
    </li>
  );
};

// Resume Button
const ResumeButton = ({ onClick, isMobile }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg ${
      isMobile ? "w-full justify-center mt-4" : ""
    }`}
  >
    <Eye size={16} />
    <span>Resume</span>
  </button>
);

// Logo
const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
      <Code size={20} className="text-white" />
    </div>
    <h1 className="text-xl md:text-2xl font-bold text-blue-600">MERN Dev</h1>
  </div>
);

// Resume Not Available Card
const ResumeNotAvailableCard = () => (
  <div className="text-center py-12">
    <AlertCircle size={64} className="mx-auto text-gray-400 mb-4" />
    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
      Resume Not Available
    </h3>
    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
      Sorry, the resume is currently not available for viewing. 
      Please check back later or contact me directly for more information.
    </p>
  </div>
);

// Resume Modal
const ResumeModal = ({ isOpen, onClose }) => {
  const [resumeError, setResumeError] = useState(false);
  const resumePath = "/Ayush_verma.pdf.pdf";

  if (!isOpen) return null;

  const handlePdfError = () => setResumeError(true);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="absolute top-4 right-4 flex gap-3 z-10">
        <button
          onClick={onClose}
          className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors shadow-lg"
          title="Close"
        >
          <X size={20} />
        </button>
      </div>

      <div className="w-full h-full flex items-center justify-center">
        {resumeError ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md mx-4">
            <ResumeNotAvailableCard />
          </div>
        ) : (
          <embed
            src={resumePath}
            className="w-full h-full"
            title="Ayush Verma Resume"
            onError={handlePdfError}
            style={{ border: "none", outline: "none", overflow: "hidden" }}
          />
        )}
      </div>
    </div>
  );
};

// Navbar
export default function Navbar() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleResumeClick = (e) => {
    e.preventDefault();
    setIsResumeOpen(true);
    setIsMobileMenuOpen(false); // close mobile menu if open
  };

  return (
    <>
     <header className="fixed top-0 w-full z-50 transition-all duration-500 backdrop-blur-xl bg-black/80 border-b border-blue-500/20 shadow-2xl shadow-blue-500/10" style={{ transform: "none" }}>
      <nav className="fixed w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-md p-4 z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6">
              {navigationConfig.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
            </ul>
            <ResumeButton onClick={handleResumeClick} />
          </div>

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
              {navigationConfig.map((item) => (
                <NavLink key={item.name} item={item} onClick={() => setIsMobileMenuOpen(false)} />
              ))}
            </ul>
            <div className="p-4">
              <ResumeButton onClick={handleResumeClick} isMobile />
            </div>
          </div>
        )}
      </nav>

      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </header>
    </>
  );
}
