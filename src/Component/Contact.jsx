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
  socialLinks: [
    { name: "GitHub", icon: "🔗", href: "https://github.com/Ayush-Verma-1613", gradient: "from-gray-700 to-gray-900" },
    { name: "Twitter", icon: "🐦", href: "https://twitter.com/ayush", gradient: "from-blue-400 to-blue-600" },
    { name: "Instagram", icon: "📷", href: "https://instagram.com/ayush", gradient: "from-pink-500 to-purple-600" },
    { name: "Discord", icon: "🎮", href: "https://discord.gg/ayush", gradient: "from-indigo-500 to-purple-600" }
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

// Floating Animation Component - Mobile optimized
const FloatingElement = ({ children, delay = 0 }) => {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className="animate-float"
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: `${isMobile ? 4 : 3 + Math.random() * 2}s`
      }}
    >
      {children}
    </div>
  );
};

// Contact Method Card - Mobile responsive
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
      className={`group block relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-cyan-400 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
      } ${isClicked ? 'scale-95' : ''} active:scale-95`}
      style={{ animationDelay: `${index * 0.15}s` }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Glowing background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-10 group-active:opacity-15 rounded-xl sm:rounded-2xl transition-opacity duration-500`} />
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500">
        <div className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r ${method.gradient} opacity-20 blur-sm animate-pulse`} />
      </div>

      <div className="relative z-10 text-center">
        {/* Icon - responsive sizing */}
        <div className={`text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 transform transition-all duration-300 ${
          isHovered || (isMobile && isClicked) ? 'scale-125 rotate-12' : 'scale-100'
        }`}>
          {method.icon}
        </div>

        {/* Title - responsive text */}
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-active:text-transparent group-active:bg-clip-text group-active:bg-gradient-to-r group-active:from-cyan-400 group-active:to-purple-500 transition-all duration-300">
          {method.name}
        </h3>

        {/* Value - responsive text and wrapping */}
        <p className="text-sm sm:text-base text-slate-300 font-medium mb-2 group-hover:text-white group-active:text-white transition-colors duration-300 break-words">
          {isMobile && method.value.length > 20 ? 
            (method.name === 'Email' ? 'Send Email' : method.value) : 
            method.value
          }
        </p>

        {/* Description - responsive text */}
        <p className="text-xs sm:text-sm text-slate-500 group-hover:text-slate-300 group-active:text-slate-300 transition-colors duration-300">
          {method.description}
        </p>

        {/* Action indicator - mobile optimized */}
        <div className={`mt-3 sm:mt-4 text-xs text-cyan-400 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 transform ${
          isHovered || (isMobile && isClicked) ? 'translate-y-0' : 'translate-y-2'
        }`}>
          Tap to {method.name === 'Email' ? 'compose' : method.name === 'Phone' ? 'call' : 'open'} →
        </div>
      </div>
    </a>
  );
};

// Social Link Component - Mobile responsive
const SocialLink = ({ social, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg sm:rounded-xl hover:border-cyan-400 active:border-cyan-400 transition-all duration-300 transform hover:scale-110 hover:rotate-12 active:scale-105 active:rotate-6 ${
        isVisible ? 'animate-fade-in-scale' : 'opacity-0 scale-0'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      {/* Glowing background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${social.gradient} opacity-0 group-hover:opacity-20 group-active:opacity-25 rounded-lg sm:rounded-xl transition-opacity duration-300`} />
      
      <span className={`text-lg sm:text-xl transform transition-all duration-300 ${
        isHovered ? 'scale-125' : 'scale-100'
      }`}>
        {social.icon}
      </span>
      
      {/* Tooltip - hidden on mobile */}
      {!isMobile && (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          {social.name}
        </div>
      )}
    </a>
  );
};

// Availability Status Component - Mobile responsive
const AvailabilityStatus = ({ isVisible }) => {
  return (
    <div className={`inline-flex items-center gap-2 sm:gap-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-4 py-2 sm:px-6 sm:py-3 transition-all duration-1000 delay-800 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      <div className="relative flex-shrink-0">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
        <div className="absolute inset-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-ping opacity-30" />
      </div>
      <div className="text-left">
        <span className="text-white font-medium text-xs sm:text-sm">{contactConfig.availability.status}</span>
        <p className="text-slate-400 text-xs hidden sm:block">{contactConfig.availability.message}</p>
      </div>
    </div>
  );
};

// Main Contact Component
export default function Contact() {
  const [titleRef, titleVisible] = useIntersectionObserver(0.1);
  const [cardsRef, cardsVisible] = useIntersectionObserver(0.1);
  const [socialRef, socialVisible] = useIntersectionObserver(0.1);
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
      className="relative py-10 sm:py-16 md:py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 overflow-hidden"
    >
      {/* Animated Background Elements - Scaled for mobile */}
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-16 sm:w-20 h-16 sm:h-20 bg-cyan-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-32 sm:top-40 right-10 sm:right-20 w-24 sm:w-32 h-24 sm:h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-20 sm:w-24 h-20 sm:h-24 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-2000" />
      </div>

      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header - Mobile responsive */}
        <div ref={titleRef} className="text-center mb-10 sm:mb-16">
          <FloatingElement delay={0}>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 transition-all duration-1000 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {contactConfig.title}
              </span>
            </h2>
          </FloatingElement>
          
          <FloatingElement delay={0.2}>
            <p className={`text-lg sm:text-xl md:text-2xl text-slate-400 mb-4 sm:mb-6 px-2 sm:px-0 transition-all duration-1000 delay-200 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              {contactConfig.subtitle}
            </p>
          </FloatingElement>
          
          <FloatingElement delay={0.4}>
            <p className={`text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0 transition-all duration-1000 delay-400 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              {isMobile ? 
                "I'm always excited to collaborate on innovative projects. Let's create something amazing together!" :
                contactConfig.description
              }
            </p>
          </FloatingElement>

          {/* Availability Status */}
          <FloatingElement delay={0.6}>
            <AvailabilityStatus isVisible={titleVisible} />
          </FloatingElement>

          {/* Current Time in India - Mobile responsive */}
          <div className={`mt-3 sm:mt-4 text-slate-500 text-xs sm:text-sm transition-all duration-1000 delay-1000 ${
            titleVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            🇮🇳 Current time in Delhi: {formatTime(currentTime)} IST
          </div>
        </div>

        {/* Contact Methods Grid - Mobile responsive */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-16 px-2 sm:px-0">
          {contactConfig.contactMethods.map((method, index) => (
            <ContactCard
              key={method.name}
              method={method}
              index={index}
              isVisible={cardsVisible}
            />
          ))}
        </div>

        {/* Response Time Info - Mobile responsive */}
        <div ref={socialRef} className="text-center">
          <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto transition-all duration-1000 delay-600 ${
            socialVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
              <span className="text-2xl sm:text-3xl">⚡</span>
              <div className="text-center sm:text-left">
                <h4 className="text-lg sm:text-xl font-bold text-white">Quick Response Guaranteed</h4>
                <p className="text-sm sm:text-base text-slate-400">Average response time: {contactConfig.availability.responseTime}</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
              I believe in clear communication and quick turnarounds. Whether it's a simple question or a complex project discussion, I'll get back to you promptly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href={`mailto:${contactConfig.email}`}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/25 active:shadow-lg active:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                Send Email 📧
              </a>
              <a
                href={`https://wa.me/918882423378`}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/25 active:shadow-lg active:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                WhatsApp Me 💬
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations - Mobile optimized */}
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
        
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(${isMobile ? '-5px' : '-10px'});
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in-scale {
          animation: fade-in-scale 0.5s ease-out forwards;
        }
        
        .animate-float {
          animation: float ${isMobile ? '4s' : '3s'} ease-in-out infinite;
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
      `}</style>
    </section>
  );
}

{/* <header class="fixed top-0 w-full z-50 transition-all duration-500 backdrop-blur-xl bg-black/80 border-b border-blue-500/20 shadow-2xl shadow-blue-500/10" style="transform: none;"></header> */}