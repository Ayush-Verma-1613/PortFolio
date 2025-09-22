import React, { useState, useEffect, useRef } from 'react';

// Configuration object for easy customization
const footerConfig = {
  name: "Ayush",
  title: "MERN Stack Developer",
  tagline: "Building digital experiences that matter",
  location: "Delhi, India"
};

// Intersection Observer Hook
const useIntersectionObserver = (threshold = 0.1) => {
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
      className={`fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-xl hover:bg-red-700 transition-all duration-300 transform hover:scale-110 z-50 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
    >
      <span className="text-xl font-bold">↑</span>
    </button>
  );
};

// Main Footer Component - Premium Black Card Style - Sticky to Bottom
export default function PremiumFooter() {
  const [footerRef, footerVisible] = useIntersectionObserver(0.1);
  const [currentYear] = useState(new Date().getFullYear());

  return (
    <>
      {/* Footer positioned at bottom of page */}
      <footer 
        className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gray-700"
       
      >
          {/* Floating particles for premium ambiance */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full opacity-20"
                style={{
                  width: `${2 + Math.random() * 3}px`,
                  height: `${2 + Math.random() * 3}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `linear-gradient(45deg, #60a5fa, #a855f7, #ec4899)`,
                  animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>

          {/* Main content container - Premium Card */}
          <div className="relative z-10 w-full max-w-12xl mx-auto">
            <div className={`transform transition-all duration-1000 ${footerVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              
              {/* Premium Black Card */}
              <div 
                ref={footerRef}
                className="bg-black rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 relative overflow-hidden border-4 border-gray-800"
              >
                
                {/* Subtle inner glow */}
                <div className="absolute inset-4 border border-gray-700 rounded-2xl pointer-events-none opacity-30"></div>
                
                {/* Card Content */}
                <div className="relative z-10 text-center space-y-6">
                  
                  {/* Brand Section */}
                  <div className="space-y-3">
                    <div className="inline-block px-6 py-2 bg-red-600 text-white text-sm font-medium tracking-widest uppercase rounded-full shadow-lg">
                      Thank You
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
                      {footerConfig.name}
                    </h2>
                    
                    <div className="w-16 h-1 bg-red-600 mx-auto"></div>
                    
                    <p className="text-lg text-red-500 font-serif font-semibold">
                      {footerConfig.title}
                    </p>
                    
                    <p className="text-base text-gray-300 font-serif max-w-2xl mx-auto">
                      {footerConfig.tagline}
                    </p>
                  </div>

                  {/* Location and Time */}
                  <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 max-w-md mx-auto">
                    <p className="text-cyan-400 font-serif text-sm">
                      📍 Based in {footerConfig.location}
                    </p>
                    <p className="text-purple-400 font-serif text-xs mt-1">
                      Always ready for new opportunities
                    </p>
                  </div>

                  {/* Copyright and Call to Action */}
                  <div className="border-t border-gray-700 pt-6 space-y-4">
                    <div>
                      <p className="text-gray-400 mb-2 font-serif">
                        © {currentYear} <span className="text-cyan-400 font-semibold">{footerConfig.name}</span> | MERN Stack Developer
                      </p>
                      <p className="text-sm text-purple-400 font-serif">
                        Crafted with passion using React, Tailwind CSS, and lots of dedication
                      </p>
                    </div>
                    
                    {/* Call to Action */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <span className="text-gray-400 font-serif">Ready to build something amazing?</span>
                      <a
                        href="#contact"
                        className="bg-red-600 text-white px-6 py-3 rounded-xl font-serif font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-red-600/30"
                      >
                        Let's Talk!
                      </a>
                    </div>
                  </div>

                  {/* Professional Footer */}
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs font-serif">
                      <div className="text-cyan-400">Professional Excellence</div>
                      <div className="text-purple-400">Quality Development</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Custom CSS for animations and footer positioning */}
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