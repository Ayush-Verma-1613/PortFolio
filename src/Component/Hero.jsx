import React, { useState, useEffect } from 'react';
import { Code, Sparkles, Star, Zap } from 'lucide-react';

// Configuration object for easy customization
const heroConfig = {
  name: "Ayush Kr. Verma",
  title: "MERN Stack Developer",
  roles: [
    "Full-Stack Developer",
    "React Specialist", 
    "Node.js Expert",
    "UI/UX Enthusiast",
    "Software Developer"
  ],
  description: "I craft exceptional digital experiences using cutting-edge technologies. Specializing in MongoDB, Express, React, and Node.js to build scalable, performant, and beautiful web applications.",
  cta: {
    primary: "View My Work",
    secondary: "Get In Touch"
  }
};

// Floating particles component - Enhanced for premium look
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `linear-gradient(45deg, #60a5fa, #a855f7, #ec4899)`,
            animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );
};

// Premium animated text component
const PremiumAnimatedText = ({ children, className = "" }) => {
  return (
    <span className={`bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x ${className}`}>
      {children}
    </span>
  );
};

// Enhanced typewriter effect - Premium Colored Text
const TypewriterText = ({ texts, speed = 100 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleType = () => {
      const fullText = texts[currentIndex];
      
      if (isDeleting) {
        setCurrentText(prev => prev.slice(0, -1));
      } else {
        setCurrentText(prev => fullText.slice(0, prev.length + 1));
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const timer = setTimeout(handleType, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentIndex, texts, speed]);

  return (
    <span className="text-cyan-400">
      {currentText}
      <span className="animate-pulse text-red-500">|</span>
    </span>
  );
};

// Premium badge component
const PremiumBadge = ({ text, icon: Icon }) => {
  return (
    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300 group">
      {Icon && <Icon size={16} className="text-blue-400 group-hover:scale-110 transition-transform" />}
      <span className="text-sm font-medium text-white">{text}</span>
    </div>
  );
};

// Professional Profile Image Component - Enhanced
const ProfileImage = () => {
  return (
    <div className="flex justify-center">
      <div className="relative group">
        {/* Main image container with thicker border */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 xl:w-64 xl:h-64 mobile-capsule border-8 sm:border-8 lg:border-6 xl:border-8 border-red-600 shadow-2xl shadow-red-600/40 overflow-hidden group-hover:animate-shake transition-all duration-300 bg-gradient-to-br from-gray-800 to-gray-900 relative">
          {/* Profile Image */}
          <img
           src="/Ayush.jpeg"
            alt="Ayush Kr. Verma - Professional Developer"
            className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay gradient for premium look */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Outer glowing ring effect - Also thicker */}
        <div className="absolute inset-0 mobile-capsule border-4 sm:border-4 lg:border-3 xl:border-4 border-red-400 opacity-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-300 animate-pulse"></div>
        
        {/* Professional status indicator */}
        
      </div>
    </div>
  );
};

// Main Hero component
export default function PremiumHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8 bg-gray-700"
      style={{ 
        paddingTop: '140px', // Extra padding for navbar clearance
        scrollMarginTop: '120px' // For smooth scroll positioning
      }}
    >
      {/* Animated background elements */}
      <FloatingParticles />
      
      {/* Premium glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20"></div>

      {/* Main content container - Premium Card */}
      <div className="relative z-10 w-full max-w-8xl mx-auto">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Premium Black Card with White Screen Background */}
          <div className="bg-black rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden border-4 border-gray-800">
            
            {/* Subtle inner glow */}
            <div className="absolute inset-4 border border-gray-700 rounded-2xl pointer-events-none opacity-30"></div>
            
            {/* Card Content */}
            <div className="relative z-10">
              
              {/* Main Content Layout - Mobile: Stacked with Image After Badge, Desktop: Side by Side */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-12">
                
                {/* Left Content */}
                <div className="flex-1 space-y-6 text-center lg:text-left">
                  
                  {/* Professional Header */}
                  <div className="space-y-4">
                    <div className="inline-block px-6 py-2 bg-red-600 text-white text-sm font-medium tracking-widest uppercase rounded-full shadow-lg">
                      Professional Developer
                    </div>
                    
                    {/* Profile Image on Mobile - Right after Professional Developer badge */}
                    <div className="block lg:hidden pt-2">
                      <ProfileImage />
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                      {heroConfig.name}
                    </h1>
                    
                    <div className="w-24 h-1 bg-red-600 mx-auto lg:mx-0"></div>
                  </div>

                  {/* Professional Title */}
                  <div className="space-y-3">
                    <h2 className="text-xl sm:text-2xl font-serif font-semibold text-red-500">
                      {heroConfig.title}
                    </h2>
                    
                    {/* Dynamic Role */}
                    <div className="bg-gray-900 rounded-xl px-6 py-3 border border-gray-700 inline-block">
                      <h3 className="text-base sm:text-lg font-serif font-medium text-cyan-400">
                        <TypewriterText texts={heroConfig.roles} speed={120} />
                      </h3>
                    </div>
                  </div>

                  {/* Professional Description */}
                  <div className="space-y-4">
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-serif">
                      {heroConfig.description}
                    </p>
                    
                    {/* Professional Quote */}
                    <blockquote className="border-l-4 border-red-600 pl-4 italic text-purple-300 font-serif text-sm">
                      "I don't follow trends, I code them."
                    </blockquote>
                  </div>

                  {/* Professional Services */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3 py-2">
                    {['MongoDB', 'Express.js', 'React.js', 'Node.js'].map((tech, i) => (
                      <div key={tech} className="bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 hover:bg-gray-800 hover:border-red-600 transition-all duration-300 group">
                        <div className="text-xs font-serif font-semibold text-cyan-400 group-hover:text-red-400">{tech}</div>
                      </div>
                    ))}
                  </div>

                  {/* Professional Contact Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-2">
                    <a
                      href="#projects"
                      className="group px-8 py-3 bg-red-600 text-white font-serif font-semibold text-base rounded-xl hover:bg-red-700 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-center shadow-xl shadow-red-600/30"
                    >
                      <span className="flex items-center justify-center gap-2">
                        View Portfolio
                        <Code size={16} className="group-hover:rotate-12 transition-transform" />
                      </span>
                    </a>
                    
                    <a
                      href="#contact"
                      className="group px-8 py-3 bg-transparent border-2 border-purple-500 text-purple-400 font-serif font-semibold text-base rounded-xl hover:bg-purple-500 hover:text-white transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-center"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Contact Me
                        <Star size={16} className="group-hover:rotate-12 transition-transform" />
                      </span>
                    </a>
                  </div>
                  
                </div>

                {/* Right Side - Professional Profile Image - Desktop Only */}
                <div className="hidden lg:block flex-shrink-0 lg:order-last lg:-mt-8">
                  <ProfileImage />
                </div>

              </div>

              {/* Professional Credentials Footer */}
              <div className="border-t border-gray-700 pt-4 mt-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-400 font-serif">
                  <div className="text-cyan-400">Available for Premium Projects</div>
                  <div className="text-purple-400">Full-Stack Development Services</div>
                </div>
              </div>

            </div>

              
            </div>
          </div>
        </div>
      

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes grid-move {
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-10px) translateY(-10px); }
          50% { transform: translateX(0) translateY(-20px); }
          75% { transform: translateX(10px) translateY(-10px); }
          100% { transform: translateX(0) translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0) scale(1); }
          10% { transform: translateX(-3px) scale(1.02) rotate(-1deg); }
          20% { transform: translateX(3px) scale(1.02) rotate(1deg); }
          30% { transform: translateX(-3px) scale(1.02) rotate(-1deg); }
          40% { transform: translateX(3px) scale(1.02) rotate(1deg); }
          50% { transform: translateX(-2px) scale(1.02) rotate(-0.5deg); }
          60% { transform: translateX(2px) scale(1.02) rotate(0.5deg); }
          70% { transform: translateX(-2px) scale(1.02) rotate(-0.5deg); }
          80% { transform: translateX(2px) scale(1.02) rotate(0.5deg); }
          90% { transform: translateX(-1px) scale(1.02) rotate(-0.3deg); }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.8s ease-in-out;
        }
        
        /* Desktop: Keep circular */
        .mobile-capsule {
          border-radius: 50%;
        }
        
        /* Tablet and smaller: Transform to capsule/oval shape */
        @media (max-width: 1024px) {
          .mobile-capsule {
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40% !important;
          }
        }
        
        @media (max-width: 768px) {
          .mobile-capsule {
            border-radius: 50% 50% 50% 50% / 70% 70% 30% 30% !important;
          }
        }
        
        @media (max-width: 640px) {
          .mobile-capsule {
            border-radius: 50% 50% 50% 50% / 80% 80% 20% 20% !important;
          }
        }
        
        /* Very small mobile: Maximum capsule effect */
        @media (max-width: 480px) {
          .mobile-capsule {
            border-radius: 50% 50% 50% 50% / 90% 90% 10% 10% !important;
          }
        }
      `}</style>
    </section>
  );
}