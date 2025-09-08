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

// Back to Top Button
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
      className={`fixed bottom-8 right-8 bg-gradient-to-r from-cyan-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-110 z-50 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
    >
      <span className="text-xl">↑</span>
    </button>
  );
};

// Main Footer Component
export default function Footer() {
  const [footerRef, footerVisible] = useIntersectionObserver(0.1);
  const [currentYear] = useState(new Date().getFullYear());
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <>
      <footer 
        ref={footerRef}
        className="relative bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white py-16 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-500/5 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500/5 rounded-full blur-xl animate-pulse delay-1000" />
          <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-pink-500/5 rounded-full blur-xl animate-pulse delay-2000" />
        </div>

        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          {/* Combined Content in Single Div */}
          <div className={`text-center transition-all duration-1000 ${
            footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            
            {/* Brand Section */}
            
        

            {/* Copyright and Call to Action */}
            <div className="border-t border-slate-800 pt-8">
              <div className="mb-6">
                <p className="text-slate-400 mb-2">
                  © {currentYear} <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-semibold">{footerConfig.name}</span> | MERN Stack Developer
                </p>
                <p className="text-sm text-slate-500">
                  Crafted with 💜 using React, Tailwind CSS, and lots of coffee ☕
                </p>
              </div>
              
              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <span className="text-slate-400">Ready to build something amazing?</span>
                <a
                  href="#contact"
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  Let's Talk! 🚀
                </a>
              </div>
            </div>

          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
}