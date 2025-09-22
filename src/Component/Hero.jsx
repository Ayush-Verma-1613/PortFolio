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

// Premium animated background grid


// Glowing orbs for premium ambiance


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

// Premium floating icons


 


// Premium badge component
const PremiumBadge = ({ text, icon: Icon }) => {
  return (
    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300 group">
      {Icon && <Icon size={16} className="text-blue-400 group-hover:scale-110 transition-transform" />}
      <span className="text-sm font-medium text-white">{text}</span>
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
            <div className="relative z-10 space-y-6">
              
              {/* Professional Header */}
              <div className="space-y-3">
                <div className="inline-block px-6 py-2 bg-red-600 text-white text-sm font-medium tracking-widest uppercase rounded-full shadow-lg">
                  Professional Developer
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                  {heroConfig.name}
                </h1>
                
                <div className="w-24 h-1 bg-red-600 mx-auto"></div>
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

              {/* Professional Description - More Compact */}
              <div className="max-w-4xl mx-auto space-y-4">
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-serif">
                  {heroConfig.description}
                </p>
                
                {/* Professional Quote */}
                <blockquote className="border-l-4 border-red-600 pl-4 italic text-purple-300 font-serif text-sm">
                  "I don't follow trends, I code them."
                </blockquote>
              </div>

              {/* Professional Services - Horizontal Layout */}
              <div className="flex flex-wrap justify-center gap-3 py-4">
                {['MongoDB', 'Express.js', 'React.js', 'Node.js'].map((tech, i) => (
                  <div key={tech} className="bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 hover:bg-gray-800 hover:border-red-600 transition-all duration-300 group">
                    <div className="text-xs font-serif font-semibold text-cyan-400 group-hover:text-red-400">{tech}</div>
                  </div>
                ))}
              </div>

              {/* Professional Contact Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
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

              {/* Professional Credentials Footer */}
              <div className="border-t border-gray-700 pt-4 mt-4">
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
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}