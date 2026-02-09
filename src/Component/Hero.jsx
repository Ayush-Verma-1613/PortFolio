import React, { useState, useEffect } from 'react';
import { Code, Star } from 'lucide-react';

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
};

// Enhanced typewriter effect
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
    <span className="text-blue-400">
      {currentText}
      <span className="animate-pulse text-blue-500">|</span>
    </span>
  );
};

// Main Hero component
export default function PremiumHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        /* Desktop Background */
        .hero-background-desktop {
          background-image: url(/HeroSection.webp);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        /* Mobile Background - Different Image */
        @media (max-width: 1023px) {
          .hero-background-mobile {
            background-image: url(/MobileheroSection.png);
            background-size: contain;
            background-position: center top;
            background-repeat: no-repeat;
            background-color: #000;
          }
        }
      `}</style>

      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-32"
        style={{ 
          scrollMarginTop: '100px'
        }}
      >
        {/* Desktop Background */}
        <div className="hidden lg:block absolute inset-0 hero-background-desktop"></div>
        
        {/* Mobile Background */}
        <div className="lg:hidden absolute inset-0 hero-background-mobile"></div>
        
        {/* Subtle dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/10 sm:bg-black/5"></div>

        {/* Main content container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Content Layout - Responsive */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 sm:gap-8 lg:gap-12 xl:gap-20">
              
              {/* Left Side - Professional Profile Image in Circle Frame */}
              <div className="flex-shrink-0 lg:-ml-16 xl:-ml-24">
                <div className="relative group">
                  {/* Circle Frame Container - Responsive */}
                  <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full border-4 border-white/20 shadow-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black relative backdrop-blur-sm">
                    {/* Profile Image */}
                    <img
                      src="/Ayush.jpeg"
                      alt="Ayush Kr. Verma - Professional Developer"
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                      style={{ objectPosition: 'center 10%' }}
                    />
                    
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>
                  
                  {/* Outer glow effect */}
                  <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"></div>
                </div>
              </div>

              {/* Right Side - Content - Fully Responsive */}
              <div className="flex-1 space-y-2 sm:space-y-3 text-center lg:text-left max-w-lg w-full">
                
                {/* Professional Badge */}
                <div className="inline-block">
                  <div className="px-3 sm:px-4 py-1 sm:py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-semibold tracking-widest uppercase rounded-full shadow-lg">
                    Professional Developer
                  </div>
                </div>
                
                {/* Name */}
                <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight tracking-tight">
                  {heroConfig.name}
                </h1>
                
                {/* Decorative line */}
                <div className="w-12 sm:w-16 h-0.5 bg-blue-500 mx-auto lg:mx-0"></div>
                
                {/* Title */}
                <h2 className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-2xl font-semibold text-blue-400">
                  {heroConfig.title}
                </h2>
                
                {/* Dynamic Role with typewriter */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 border border-white/10 inline-block">
                  <h3 className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base font-medium">
                    <TypewriterText texts={heroConfig.roles} speed={120} />
                  </h3>
                </div>
                
                {/* Description */}
                <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base text-gray-200 leading-relaxed">
                  {heroConfig.description}
                </p>
                
                {/* Professional Quote */}
                <blockquote className="border-l-2 border-blue-500 pl-3 sm:pl-4 italic text-blue-300 text-xs sm:text-sm">
                  "I don't follow trends, I code them."
                </blockquote>
                
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center lg:justify-start">
                  {['MongoDB', 'Express.js', 'React.js', 'Node.js'].map((tech) => (
                    <div key={tech} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-1 sm:py-1.5 px-2 sm:px-3 hover:bg-white/20 hover:border-blue-400 transition-all duration-300">
                      <div className="text-[10px] sm:text-xs font-semibold text-blue-300">{tech}</div>
                    </div>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 pt-2 justify-center lg:justify-start">
                  <a
                    href="#projects"
                    className="group px-4 sm:px-5 py-2 sm:py-2.5 bg-blue-600 text-white font-semibold text-xs sm:text-sm rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 text-center shadow-xl shadow-blue-600/30"
                  >
                    <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                      View Portfolio
                      <Code size={12} className="sm:w-3.5 sm:h-3.5 group-hover:rotate-12 transition-transform" />
                    </span>
                  </a>
                  
                  <a
                    href="#contact"
                    className="group px-4 sm:px-5 py-2 sm:py-2.5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold text-xs sm:text-sm rounded-lg hover:bg-white/20 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 text-center"
                  >
                    <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                      Contact Me
                      <Star size={12} className="sm:w-3.5 sm:h-3.5 group-hover:rotate-12 transition-transform" />
                    </span>
                  </a>
                </div>
                
              </div>

            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}