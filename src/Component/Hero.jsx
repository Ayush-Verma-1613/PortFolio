import React, { useState, useEffect } from 'react';

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

// Profile Image Component with larger image in round frame
const ProfileImage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative flex justify-center items-center">
      {/* Outer glowing ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 blur-sm animate-pulse opacity-75"></div>
      
      {/* Middle ring - reduced padding for larger image */}
      <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 p-[2px]">
        
        {/* Inner container - minimal padding for maximum image size */}
        <div className="w-full h-full rounded-full bg-slate-900 p-[1px] flex items-center justify-center overflow-hidden">
          
          {/* Image container - fills almost entire space */}
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 relative group">
            {!imageError ? (
              <>
                {/* Actual image - now fills the entire container */}
                <img
                  src="Picture.jpeg"
                  alt="Ayush - MERN Stack Developer"
                  className={`w-full h-full object-cover object-center transition-all duration-700 transform group-hover:scale-105 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
                
                {/* Loading placeholder */}
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-400"></div>
                  </div>
                )}
              </>
            ) : (
              /* Fallback avatar if image fails to load */
              <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex flex-col items-center justify-center text-slate-300">
                <div className="text-8xl mb-4">👨‍💻</div>
                <div className="text-lg font-semibold text-cyan-400">Ayush</div>
              </div>
            )}
            
            {/* Hover overlay - subtle so it doesn't hide the image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Floating icons around the image */}
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center animate-bounce">
        <span className="text-xl">⚛️</span>
      </div>
      <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}>
        <span className="text-xl">🚀</span>
      </div>
      <div className="absolute top-1/2 -right-8 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full flex items-center justify-center animate-pulse">
        <span className="text-sm">💻</span>
      </div>
    </div>
  );
};

// Main Hero component
export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-xy"></div>
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2220%22 cy=%2220%22 r=%223%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      }}></div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left side - Text content */}
          <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'} text-center lg:text-left order-2 lg:order-1`}>
            
            {/* Greeting and Name */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                I'm <AnimatedText className="font-black">{heroConfig.name}</AnimatedText>
              </h1>
              <p className="text-amber-400 text-lg sm:text-xl">I don't follow trends, I code them.</p>
            </div>

            {/* Dynamic title with typewriter effect */}
            <div className="h-12 sm:h-16 flex items-center justify-center lg:justify-start">
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold">
                <TypewriterText texts={heroConfig.roles} speed={150} />
              </h2>
            </div>

            {/* Description */}
            <div>
              <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {heroConfig.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <a
                href="#projects"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-semibold text-base sm:text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 w-full sm:w-auto text-center"
              >
                <span className="relative z-10">{heroConfig.cta.primary}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              
              <a
                href="#contact"
                className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-slate-600 rounded-full text-slate-300 font-semibold text-base sm:text-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-slate-800/30 w-full sm:w-auto text-center"
              >
                {heroConfig.cta.secondary}
              </a>
            </div>
          </div>

          {/* Right side - Profile Image */}
          <div className={`flex justify-center lg:justify-end transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} order-1 lg:order-2`}>
            <ProfileImage />
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