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

// NavLink Component - Simplified without animation
const NavLink = ({ item, onClick }) => {
  const IconComponent = item.icon;
  
  const handleClick = (e) => {
    e.preventDefault();
    
    // Handle smooth scroll with reduced offset for fixed navbar
    const targetId = item.href.substring(1); // Remove # from href
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const navbarHeight = 80; // Reduced height for less spacing
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    
    if (onClick) onClick();
  };

  return (
    <a 
      href={item.href}
      onClick={handleClick}
      className="nav-btn flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-blue-500/20 transition-all duration-200 group text-white font-medium"
    >
      <IconComponent size={18} className="group-hover:scale-110 transition-transform" />
      <span>{item.name}</span>
    </a>
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
const Logo = () => {
  const handleClick = (e) => {
    e.preventDefault();
    const targetElement = document.getElementById("home");
    if (targetElement) {
      const navbarHeight = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <a 
      href="#home" 
      onClick={handleClick}
      className="flex items-center gap-2 cursor-pointer"
    >
      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
        <Code size={20} className="text-white" />
      </div>
      <h1 className="text-xl md:text-2xl font-bold text-white">MERN Dev</h1>
    </a>
  );
};

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
    <div className="fixed inset-0 bg-black z-50" style={{ width: '100vw', height: '100vh' }}>
      {/* Close Button */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={onClose}
          className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors shadow-lg flex items-center gap-2"
          title="Close Resume"
        >
          <X size={24} />
          <span className="hidden sm:inline">Close</span>
        </button>
      </div>

      {/* Download Button */}
      <div className="absolute top-4 left-4 z-20">
        <a
          href={resumePath}
          download="Ayush_Verma_Resume.pdf"
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors shadow-lg flex items-center gap-2"
          title="Download Resume"
        >
          <Download size={24} />
          <span className="hidden sm:inline">Download</span>
        </a>
      </div>

      {/* Modal Content */}
      <div className="w-full h-full">
        {resumeError ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md mx-4">
              <ResumeNotAvailableCard />
            </div>
          </div>
        ) : (
          <iframe
            src={resumePath}
            className="w-full h-full border-0"
            title="Ayush Verma Resume"
            onError={handlePdfError}
            style={{ 
              width: '100%', 
              height: '100%',
              border: 'none',
              outline: 'none',
              margin: 0,
              padding: 0
            }}
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
      <style>
        {`
          .nav-container {
            position: relative;
          }
          
          .nav-content {
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(59, 130, 246, 0.3);
          }
          
          .nav-btn:hover {
            transform: translateY(-1px);
          }

          /* Reduced scroll padding for less spacing */
          html {
            scroll-padding-top: 80px;
          }

          /* Reduced scroll margin for sections */
          section {
            scroll-margin-top: 80px;
          }
        `}
      </style>

      <header className="fixed top-0 w-full z-50 transition-all duration-500 backdrop-blur-xl bg-black/80 border-b border-blue-500/20 shadow-2xl shadow-blue-500/10">
        <nav className="nav-container relative">
          <div className="nav-content container mx-auto flex justify-between items-center p-4 rounded-lg mx-4 my-2 relative z-10">
            <Logo />

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex space-x-2">
                {navigationConfig.map((item) => (
                  <NavLink 
                    key={item.name} 
                    item={item}
                  />
                ))}
              </div>
              <ResumeButton onClick={handleResumeClick} />
            </div>

            {/* Mobile Hamburger */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-blue-500/20 text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* SVG Animation Overlay - REMOVED */}

          {/* Mobile Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-2 mx-4 bg-black/90 backdrop-blur-sm rounded-lg shadow-lg border border-blue-500/30">
              <ul className="flex flex-col divide-y divide-blue-500/20">
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