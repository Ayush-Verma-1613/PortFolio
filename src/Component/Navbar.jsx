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
const NavLink = ({ item, onClick, isActive, isMobile }) => {
  const IconComponent = item.icon;
  
  const handleClick = (e) => {
    e.preventDefault();
    
    const targetId = item.href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const navbarHeight = 80;
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
      className={`nav-btn flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 group font-medium ${
        isActive 
          ? "text-amber-400 font-bold underline" 
          : "text-gray-100 hover:text-amber-400"
      } ${isMobile ? "justify-center" : ""}`}
      title={isMobile ? item.name : undefined}
    >
      <IconComponent size={18} className="group-hover:scale-110 transition-transform" />
      {!isMobile && <span>{item.name}</span>}
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
  const [activeSection, setActiveSection] = useState("home");

  // Track active section on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = navigationConfig.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleResumeClick = (e) => {
    e.preventDefault();
    setIsResumeOpen(true);
  };

  return (
    <>
      <style>
        {`
          html {
            scroll-padding-top: 80px;
          }

          section {
            scroll-margin-top: 80px;
          }
        `}
      </style>

      <header className="fixed top-0 w-full z-50 py-4 md:py-8 px-4 md:px-8">
        <nav className="relative flex justify-center items-center">
          {/* Desktop Centered Oval Menu - Full text + icons */}
          <div className="hidden lg:flex bg-gray-900 gap-4 xl:gap-6 shadow-lg items-center border border-gray-200 px-6 xl:px-8 py-3 rounded-full">
            {navigationConfig.map((item) => (
              <NavLink 
                key={item.name} 
                item={item}
                isActive={activeSection === item.href.substring(1)}
                isMobile={false}
              />
            ))}
            <ResumeButton onClick={handleResumeClick} />
          </div>

          {/* Mobile Centered Oval Menu - Icons only */}
          <div className="lg:hidden flex bg-gray-900 gap-2 sm:gap-3 shadow-lg items-center border border-gray-200 px-4 py-3 rounded-full">
            {navigationConfig.map((item) => (
              <NavLink 
                key={item.name} 
                item={item}
                isActive={activeSection === item.href.substring(1)}
                isMobile={true}
              />
            ))}
            <button
              onClick={handleResumeClick}
              className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors shadow-md hover:shadow-lg"
              title="Resume"
            >
              <Eye size={16} />
            </button>
          </div>
        </nav>

        {/* Resume Modal */}
        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      </header>
    </>
  );
}