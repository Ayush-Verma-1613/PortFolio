import React, { useState, useEffect, useRef } from 'react';

// Configuration object for easy customization
const footerConfig = {
  name: "Ayush",
  title: "MERN Stack Developer",
  tagline: "Building digital experiences that matter",
  location: "Delhi, India"
};

// Intersection Observer Hook
const useIntersectionObserver = (threshold = 0.01) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isIntersecting];
};

// Back to Top Button - Premium Style
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-cyan-600 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:bg-cyan-700 transition-all duration-300 transform hover:scale-110 z-50 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
      aria-label="Back to top"
    >
      <span className="text-lg sm:text-xl font-bold">↑</span>
    </button>
  );
};

// Main Footer Component
export default function PremiumFooter() {
  const [footerRef, footerVisible] = useIntersectionObserver(0.01);
  const [currentYear] = useState(new Date().getFullYear());

  return (
    <>
      {/* Footer with gradient background */}
      <footer 
        className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-black to-black"
      >
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Main content container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className={`transform transition-all duration-1000 ${footerVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Content with glassmorphism */}
            <div 
              ref={footerRef}
              className="relative space-y-4 sm:space-y-6"
            >
              
              {/* Card Content */}
              <div className="relative z-10 text-center space-y-4 sm:space-y-6">
                
                {/* Brand Section */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-medium tracking-widest uppercase rounded-full shadow-lg border border-white/20">
                    Thank You
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight drop-shadow-2xl">
                    {footerConfig.name}
                  </h2>
                  
                  <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-cyan-500 mx-auto"></div>
                  
                  <p className="text-base sm:text-lg text-cyan-300 font-serif font-semibold drop-shadow-lg">
                    {footerConfig.title}
                  </p>
                  
                  <p className="text-xs sm:text-sm md:text-base text-gray-200 font-serif max-w-2xl mx-auto px-4">
                    {footerConfig.tagline}
                  </p>
                </div>

                {/* Location and Status */}
                <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4 max-w-md mx-auto">
                  <p className="text-cyan-300 font-serif text-xs sm:text-sm">
                    📍 Based in {footerConfig.location}
                  </p>
                  <p className="text-purple-300 font-serif text-[10px] sm:text-xs mt-1">
                    Always ready for new opportunities
                  </p>
                </div>

                {/* Copyright and Call to Action */}
                <div className="border-t border-white/20 pt-4 sm:pt-6 space-y-3 sm:space-y-4">
                  <div>
                    <p className="text-gray-300 mb-2 font-serif text-xs sm:text-sm">
                      © {currentYear} <span className="text-cyan-300 font-semibold">{footerConfig.name}</span> | MERN Stack Developer
                    </p>
                    <p className="text-[10px] sm:text-xs md:text-sm text-purple-300 font-serif">
                      Crafted with passion using React, Tailwind CSS, and lots of dedication
                    </p>
                  </div>
                  
                  {/* Call to Action */}
                  <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center items-center">
                    <span className="text-gray-300 font-serif text-xs sm:text-sm">Ready to build something amazing?</span>
                    <a
                      href="#contact"
                      className="bg-cyan-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-serif font-semibold hover:bg-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-2xl text-xs sm:text-sm"
                    >
                      Let's Talk!
                    </a>
                  </div>
                </div>

                {/* Professional Footer */}
                <div className="border-t border-white/20 pt-3 sm:pt-4">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] sm:text-xs font-serif">
                    <div className="text-cyan-300">Professional Excellence</div>
                    <div className="text-purple-300">Quality Development</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}</style>
      </footer>

      {/* Back to Top Button */}
      <BackToTop />

      {/* Global styles to ensure footer sticks to bottom */}
      <style jsx global>{`
        /* Ensure page takes full height */
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
        }
        
        /* Make the main app container flex */
        #root, #__next, [data-reactroot] {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        /* Ensure main content takes available space */
        main {
          flex: 1;
        }
        
        /* Alternative: If using body wrapper */
        body > div {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        /* Push footer to bottom */
        footer {
          margin-top: auto !important;
        }
      `}</style>
    </>
  );
}