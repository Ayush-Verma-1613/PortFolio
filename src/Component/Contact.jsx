import React, { useState, useEffect, useRef } from 'react';

// Configuration object for easy customization
const contactConfig = {
  title: "Let's Connect",
  subtitle: "Ready to bring your ideas to life?",
  description: "I'm always excited to collaborate on innovative projects and help bring your vision to reality. Whether you need a full-stack application, frontend magic, or technical consultation, let's create something amazing together.",
  email: "ayushverma1613@gmail.com",
  phone: "+91 8882423378",
  location: "Delhi, India",
  contactMethods: [
    {
      name: "Email",
      icon: "📧",
      value: "ayushverma1613@gmail.com",
      href: "mailto:ayushverma1613@gmail.com",
      description: "Drop me a line anytime",
      gradient: "from-blue-500 to-cyan-500",
      hoverGradient: "from-blue-600 to-cyan-600"
    },
    {
      name: "Phone",
      icon: "📱",
      value: "+91 8882423378",
      href: "tel:+918882423378",
      description: "Let's have a quick chat",
      gradient: "from-green-500 to-emerald-500",
      hoverGradient: "from-green-600 to-emerald-600"
    },
    {
      name: "WhatsApp",
      icon: "💬",
      value: "WhatsApp Chat",
      href: "https://wa.me/918882423378",
      description: "Message me instantly",
      gradient: "from-green-400 to-green-600",
      hoverGradient: "from-green-500 to-green-700"
    },
    {
      name: "LinkedIn",
      icon: "💼",
      value: "Connect on LinkedIn",
      href: "https://www.linkedin.com/in/ayush-kumar-verma/",
      description: "Let's network professionally",
      gradient: "from-blue-600 to-indigo-600",
      hoverGradient: "from-blue-700 to-indigo-700"
    }
  ],
  availability: {
    status: "Available for Projects",
    message: "Currently accepting new opportunities",
    responseTime: "24 hours"
  }
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

// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Contact Method Card - Premium Style
const ContactCard = ({ method, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const isMobile = useIsMobile();

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
  };

  return (
    <a
      href={method.href}
      className={`group block relative bg-white/5 backdrop-blur-md border border-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-cyan-400 transition-all duration-500 transform hover:scale-105 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
      } ${isClicked ? 'scale-95' : ''} active:scale-95`}
      style={{ animationDelay: `${index * 0.15}s` }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Glowing background */}
      <div className="absolute inset-0 bg-cyan-600/10 opacity-0 group-hover:opacity-100 rounded-lg sm:rounded-xl transition-opacity duration-500" />

      <div className="relative z-10 text-center">
        {/* Icon */}
        <div className={`text-2xl sm:text-3xl mb-2 sm:mb-3 transform transition-all duration-300 ${
          isHovered || (isMobile && isClicked) ? 'scale-125 rotate-12' : 'scale-100'
        }`}>
          {method.icon}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-serif font-bold text-white mb-1.5 sm:mb-2 group-hover:text-cyan-300 transition-all duration-300">
          {method.name}
        </h3>

        {/* Value */}
        <p className="text-xs sm:text-sm text-gray-200 font-serif mb-1.5 sm:mb-2 group-hover:text-white transition-colors duration-300 break-words px-1">
          {isMobile && method.value.length > 20 ? 
            (method.name === 'Email' ? 'Send Email' : method.value) : 
            method.value
          }
        </p>

        {/* Description */}
        <p className="text-[10px] sm:text-xs text-purple-300 font-serif group-hover:text-cyan-300 transition-colors duration-300">
          {method.description}
        </p>

        {/* Action indicator */}
        <div className={`mt-2 sm:mt-3 text-[10px] sm:text-xs text-cyan-300 opacity-0 group-hover:opacity-100 transition-all duration-300 transform ${
          isHovered || (isMobile && isClicked) ? 'translate-y-0' : 'translate-y-2'
        }`}>
          Tap to {method.name === 'Email' ? 'compose' : method.name === 'Phone' ? 'call' : 'open'} →
        </div>
      </div>
    </a>
  );
};

// Availability Status Component - Premium Style
const AvailabilityStatus = ({ isVisible }) => {
  return (
    <div className={`inline-flex items-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 sm:px-6 sm:py-3 transition-all duration-1000 delay-800 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      <div className="relative flex-shrink-0">
        <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-green-400 rounded-full animate-pulse" />
        <div className="absolute inset-0 w-2.5 sm:w-3 h-2.5 sm:h-3 bg-green-400 rounded-full animate-ping opacity-30" />
      </div>
      <div className="text-left">
        <span className="text-white font-serif font-medium text-xs sm:text-sm">{contactConfig.availability.status}</span>
        <p className="text-purple-300 text-[10px] sm:text-xs font-serif hidden sm:block">{contactConfig.availability.message}</p>
      </div>
    </div>
  );
};

// Main Contact Component
export default function PremiumContact() {
  const [titleRef, titleVisible] = useIntersectionObserver(0.01);
  const [cardsRef, cardsVisible] = useIntersectionObserver(0.01);
  const [socialRef, socialVisible] = useIntersectionObserver(0.01);
  const [currentTime, setCurrentTime] = useState(new Date());
  const isMobile = useIsMobile();

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
    <section 
      id="contact" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/contactUs.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll'
        }}
      ></div>
      
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className={`transform transition-all duration-1000 `}>
          
          {/* Content without background card */}
          <div className="relative space-y-4 sm:space-y-6">
            
            {/* Section Header */}
            <div ref={titleRef} className="text-center space-y-2 sm:space-y-3">
              <div className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-medium tracking-widest uppercase rounded-full shadow-lg border border-white/20">
                Get In Touch
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight drop-shadow-2xl">
                {contactConfig.title}
              </h2>
              
              <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-cyan-500 mx-auto"></div>
              
              <p className="text-base sm:text-lg md:text-xl text-cyan-300 font-serif font-semibold drop-shadow-lg">
                {contactConfig.subtitle}
              </p>

              <p className="text-xs sm:text-sm md:text-base text-gray-200 max-w-3xl mx-auto leading-relaxed font-serif px-4 sm:px-0">
                {isMobile ? 
                  "I'm always excited to collaborate on innovative projects. Let's create something amazing together!" :
                  contactConfig.description
                }
              </p>

              {/* Availability Status */}
              <AvailabilityStatus isVisible={titleVisible} />

              {/* Current Time */}
              <div className={`text-purple-300 text-xs sm:text-sm font-serif transition-all duration-1000 delay-1000 ${
                titleVisible ? 'opacity-100' : 'opacity-0'
              }`}>
                Current time in Delhi: {formatTime(currentTime)} IST
              </div>
            </div>

            {/* Contact Methods Grid - Mobile Responsive */}
            <div ref={cardsRef} className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {contactConfig.contactMethods.map((method, index) => (
                <ContactCard
                  key={method.name}
                  method={method}
                  index={index}
                  isVisible={cardsVisible}
                />
              ))}
            </div>

            {/* Response Time Info */}
            <div ref={socialRef} className="text-center">
              <div className={`bg-white/5 backdrop-blur-md border border-white/20 rounded-lg sm:rounded-xl p-4 sm:p-6 max-w-2xl mx-auto transition-all duration-1000 delay-600 ${
                socialVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">⚡</span>
                  <div className="text-center sm:text-left">
                    <h4 className="text-base sm:text-lg font-serif font-bold text-cyan-300">Quick Response Guaranteed</h4>
                    <p className="text-xs sm:text-sm text-purple-300 font-serif">Average response time: {contactConfig.availability.responseTime}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-200 mb-4 sm:mb-6 leading-relaxed font-serif">
                  I believe in clear communication and quick turnarounds. Whether it's a simple question or a complex project discussion, I'll get back to you promptly.
                </p>
                <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 justify-center">
                  <a
                    href={`mailto:${contactConfig.email}`}
                    className="bg-cyan-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-serif font-semibold hover:bg-cyan-700 transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm shadow-2xl"
                  >
                    Send Email
                  </a>
                  <a
                    href={`https://wa.me/918882423378`}
                    className="bg-transparent border-2 border-purple-400 text-purple-300 px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-serif font-semibold hover:bg-purple-500 hover:text-white transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm"
                  >
                    WhatsApp Me
                  </a>
                </div>
              </div>
            </div>

            {/* Professional Footer */}
            <div className="border-t border-white/20 pt-3 sm:pt-4 mt-4 sm:mt-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] sm:text-xs font-serif">
                <div className="text-cyan-300">Always Available</div>
                <div className="text-purple-300">Quick Response Time</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(${isMobile ? '20px' : '30px'});
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }

        /* Touch feedback improvements */
        @media (hover: none) and (pointer: coarse) {
          .group:active {
            transform: scale(0.95);
          }
        }

        /* Prevent text selection on mobile */
        @media (max-width: 768px) {
          .group {
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
          }
        }
        
        /* Ensure background image displays properly */
        section#contact {
          background-attachment: scroll;
        }
        
        @media (max-width: 640px) {
          #contact {
            min-height: 100vh;
          }
        }
      `}</style>
    </section>
  );
}