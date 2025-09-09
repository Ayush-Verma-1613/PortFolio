import React, { useState, useEffect } from 'react';

// Configuration object for easy customization
const heroConfig = {
  name: "Ayush",
  title: "MERN Stack Developer",
  roles: [
    "Full-Stack Developer",
    "React Specialist", 
    "Node.js Expert",
    "UI/UX Enthusiast"
  ],
  description: "I craft exceptional digital experiences using cutting-edge technologies. Specializing in MongoDB, Express, React, and Node.js to build scalable, performant, and beautiful web applications.",
  cta: {
    primary: "View My Work",
    secondary: "Get In Touch"
  },
  social: [
    { name: "GitHub", icon: "🔗" },
    { name: "LinkedIn", icon: "💼" },
    { name: "Twitter", icon: "🐦" }
  ]
};

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

// Animated gradient text component
const AnimatedText = ({ children, className = "" }) => {
  return (
    <span className={`bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x ${className}`}>
      {children}
    </span>
  );
};

// Typewriter effect component
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
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const timer = setTimeout(handleType, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentIndex, texts, speed]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Social link component
const SocialLink = ({ item, index }) => (
  <div
    className="group relative cursor-pointer transform transition-all duration-300 hover:scale-110"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-sm group-hover:blur-md transition-all duration-300 opacity-50 group-hover:opacity-75"></div>
    <div className="relative bg-slate-800 border border-slate-700 rounded-full p-3 group-hover:border-cyan-400 transition-all duration-300">
      <span className="text-xl">{item.icon}</span>
    </div>
  </div>
);

// Main Hero component
export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden "
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-xy"></div>
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0"style={{
    backgroundImage:
      "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2220%22 cy=%2220%22 r=%223%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
  }}></div>

      {/* Main content */}
      <div className={`relative z-10 max-w-4xl mx-auto px-6 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
        {/* Greeting */}
        <div className="mb-8 transform transition-all duration-700 delay-200">
          <span className="inline-block text-lg text-slate-400 mb-4 animate-fade-in">
            Hello there! 👋
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            I'm <AnimatedText className="font-black">{heroConfig.name}</AnimatedText>
          </h1>
          <p className="text-amber-400">I don’t follow trends, I code them.</p>
        </div>

        {/* Dynamic title with typewriter effect */}
        <div className="mb-8 h-16 flex items-center justify-center">
          <h2 className="text-2xl md:text-4xl font-bold">
            <TypewriterText texts={heroConfig.roles} speed={150} />
          </h2>
        </div>

        {/* Description */}
        <div className="mb-12 transform transition-all duration-700 delay-500">
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {heroConfig.description}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mb-12 flex flex-col sm:flex-row gap-4 justify-center items-center transform transition-all duration-700 delay-700">
          <a
            href="#projects"
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-semibold text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            <span className="relative z-10">{heroConfig.cta.primary}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          
          <a
            href="#contact"
            className="group px-8 py-4 border-2 border-slate-600 rounded-full text-slate-300 font-semibold text-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-slate-800/30"
          >
            {heroConfig.cta.secondary}
          </a>
        </div>

        {/* Social Links */}
        
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
        
        @keyframes gradient-xy {
          0%, 100% {
            background-position: 0% 0%;
          }
          25% {
            background-position: 100% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          75% {
            background-position: 0% 100%;
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-gradient-xy {
          background-size: 400% 400%;
          animation: gradient-xy 15s ease infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </section>
  );
}