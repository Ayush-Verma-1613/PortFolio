import React, { useState, useEffect, useRef } from 'react';

// Configuration object for easy customization
const skillsConfig = {
  title: "Technical Skills",
  subtitle: "Technologies I Master",
  skillCategories: {
    "Frontend": [
      { name: "React", icon: "⚛️", color: "from-blue-400 to-cyan-500", level: 95 },
      { name: "JavaScript", icon: "🟨", color: "from-yellow-400 to-orange-500", level: 92 },
      { name: "TailwindCSS", icon: "🎨", color: "from-cyan-400 to-blue-600", level: 90 },
      { name: "HTML5", icon: "🧡", color: "from-orange-500 to-red-500", level: 95 },
      { name: "CSS3", icon: "💙", color: "from-blue-500 to-purple-500", level: 88 },
      { name: "Vite", icon: "⚡", color: "from-purple-400 to-pink-500", level: 85 }
    ],
    "Backend": [
      { name: "Node.js", icon: "🟢", color: "from-green-400 to-emerald-500", level: 90 },
      { name: "Express", icon: "🚂", color: "from-gray-400 to-slate-600", level: 88 },
      { name: "Python", icon: "🐍", color: "from-yellow-400 to-blue-500", level: 85 },
      { name: "Java", icon: "☕", color: "from-red-500 to-orange-600", level: 82 },
      { name: "C++", icon: "⚙️", color: "from-blue-600 to-purple-600", level: 80 }
    ],
    "Database": [
      { name: "MongoDB", icon: "🍃", color: "from-green-500 to-teal-500", level: 87 },
      { name: "PostgreSQL", icon: "🐘", color: "from-blue-500 to-indigo-600", level: 80 },
      { name: "MySQL", icon: "🗄️", color: "from-orange-500 to-yellow-500", level: 78 }
    ],
    "Tools & Platforms": [
      { name: "Git", icon: "📝", color: "from-orange-500 to-red-600", level: 92 },
      { name: "GitHub", icon: "🐙", color: "from-gray-700 to-gray-900", level: 90 },
      { name: "Vercel", icon: "▲", color: "from-black to-gray-700", level: 88 },
      { name: "Render", icon: "🚀", color: "from-purple-500 to-pink-500", level: 85 }
    ],
    "Concepts": [
      { name: "OOP", icon: "🏗️", color: "from-indigo-500 to-purple-600", level: 88 },
      { name: "REST API", icon: "🔌", color: "from-green-400 to-blue-500", level: 90 }
    ]
  }
};

// Flatten all skills for continuous scroll
const allSkills = Object.values(skillsConfig.skillCategories).flat();

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

// Simple Skill Badge Component with mobile optimization
const SkillBadge = ({ skill, index, isDragging }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative flex-shrink-0 mx-1 sm:mx-2 transform transition-all duration-300 ${
        isDragging ? 'scale-105' : 'hover:scale-110'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glowing background effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-xl sm:rounded-2xl blur-sm transition-opacity duration-300 ${
        isDragging ? 'opacity-40' : 'opacity-0 group-hover:opacity-60'
      }`} />
      
      {/* Main badge - responsive sizing */}
      <div className={`relative bg-slate-800/90 backdrop-blur-sm border rounded-xl sm:rounded-2xl px-3 py-3 sm:px-6 sm:py-4 shadow-lg transition-all duration-300 ${
        isDragging ? 'border-cyan-400' : 'border-slate-700 group-hover:border-transparent'
      }`}>
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-xl sm:rounded-2xl transition-opacity duration-300 ${
          isDragging ? 'opacity-15' : 'opacity-0 group-hover:opacity-20'
        }`} />
        
        {/* Content - responsive layout */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <span className={`text-lg sm:text-2xl transform transition-transform duration-300 ${
            isHovered || isDragging ? 'scale-125 rotate-12' : 'scale-100'
          }`}>
            {skill.icon}
          </span>
          <div className="text-center sm:text-left">
            <span className={`block font-semibold text-sm sm:text-lg transition-all duration-300 ${
              isDragging ? 'text-cyan-300' : 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-300'
            }`}>
              {skill.name}
            </span>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
              <div className="w-8 sm:w-12 h-1 bg-slate-600 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ${
                    isDragging ? 'animate-pulse' : ''
                  }`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <span className={`text-xs transition-colors duration-300 ${
                isDragging ? 'text-cyan-400' : 'text-slate-400'
              }`}>
                {skill.level}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile touch detection
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

// Main Skills Component
export default function Skills() {
  const [titleRef, titleVisible] = useIntersectionObserver(0.1);
  const [scrollRef, scrollVisible] = useIntersectionObserver(0.1);
  const [summaryRef, summaryVisible] = useIntersectionObserver(0.1);
  const isMobile = useIsMobile();
  
  // Drag control states
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [dragStartX, setDragStartX] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [lastMoveTime, setLastMoveTime] = useState(0);
  const [lastPosition, setLastPosition] = useState(0);
  const scrollContainerRef = useRef(null);

  // Create duplicated array for seamless infinite scroll
  const duplicatedSkills = [...allSkills, ...allSkills, ...allSkills];

  // Handle drag start - improved for mobile
  const handleDragStart = (e) => {
    setIsDragging(true);
    setIsAutoScrolling(false);
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
    setLastPosition(clientX);
    setLastMoveTime(Date.now());
    setVelocity(0);
    e.preventDefault();
  };

  // Handle drag move - optimized for mobile
  const handleDragMove = (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const currentTime = Date.now();
    const deltaTime = currentTime - lastMoveTime;
    const deltaX = clientX - lastPosition;
    
    // Improved sensitivity for mobile vs desktop
    const sensitivity = isMobile ? 0.8 : 0.5;
    const newPosition = dragPosition + deltaX * sensitivity;
    setDragPosition(newPosition);
    
    // Calculate velocity for momentum (improved for mobile)
    if (deltaTime > 0) {
      const newVelocity = deltaX / deltaTime * (isMobile ? 15 : 10);
      setVelocity(newVelocity);
    }
    
    setLastPosition(clientX);
    setLastMoveTime(currentTime);
  };

  // Handle drag end with improved momentum
  const handleDragEnd = () => {
    setIsDragging(false);
    
    // Apply momentum with better mobile handling
    let momentum = velocity;
    const decay = isMobile ? 0.92 : 0.95;
    const minMomentum = isMobile ? 0.2 : 0.1;
    
    const momentumInterval = setInterval(() => {
      setDragPosition((prev) => prev + momentum);
      momentum *= decay;
      
      if (Math.abs(momentum) < minMomentum) {
        clearInterval(momentumInterval);
        setVelocity(0);
        // Resume auto-scrolling after momentum stops
        setTimeout(() => {
          setIsAutoScrolling(true);
        }, isMobile ? 800 : 500);
      }
    }, 16);
  };

  // Auto-scroll reset for seamless looping
  useEffect(() => {
    if (!isAutoScrolling || isDragging) return;

    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const checkScroll = () => {
      const containerWidth = scrollContainer.offsetWidth;
      const skillWidth = isMobile ? 120 : 200; // Approximate skill badge width
      const totalSkillsWidth = allSkills.length * skillWidth;

      if (Math.abs(dragPosition) >= totalSkillsWidth) {
        setDragPosition(0);
      }
    };

    const interval = setInterval(checkScroll, 100);
    return () => clearInterval(interval);
  }, [isAutoScrolling, isDragging, dragPosition, isMobile]);

  return (
    <section 
      id="skills" 
      className="relative py-10 sm:py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header - Mobile responsive */}
        <div ref={titleRef} className="text-center mb-8 sm:mb-16">
          <h2
            className={`text-2xl sm:text-3xl md:text-5xl font-black mb-3 sm:mb-4 transition-all duration-1000 ${
              titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {skillsConfig.title}
            </span>
          </h2>
          <p
            className={`text-sm sm:text-base md:text-xl text-slate-400 mb-4 sm:mb-8 px-4 sm:px-0 transition-all duration-1000 delay-200 ${
              titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {skillsConfig.subtitle}
          </p>
        </div>

        {/* Draggable Scrolling Skills - Mobile optimized */}
        <div 
          ref={scrollRef} 
          className={`mb-12 sm:mb-20 transition-all duration-1000 ${
            scrollVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            ref={scrollContainerRef}
            className="relative overflow-hidden py-4 sm:py-8 select-none"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            onTouchCancel={handleDragEnd}
            style={{ 
              cursor: isDragging ? 'grabbing' : 'grab',
              touchAction: 'none'
            }}
          >
            {/* Scrolling container with drag control */}
            <div 
              className={`flex transition-transform ${
                isAutoScrolling && !isDragging ? 'duration-100' : 'duration-200'
              } ${
                isAutoScrolling && !isDragging ? 'animate-scroll' : ''
              }`}
              style={{
                transform: `translateX(${dragPosition}px)`,
                animationPlayState: isDragging ? 'paused' : 'running'
              }}
            >
              {duplicatedSkills.map((skill, index) => (
                <SkillBadge
                  key={`${skill.name}-${index}`}
                  skill={skill}
                  index={index}
                  isDragging={isDragging}
                />
              ))}
            </div>
            
            {/* Enhanced gradient overlays - responsive */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none z-10" />
            
            {/* Drag indication lines - mobile friendly */}
            {isDragging && (
              <div className="absolute inset-0 pointer-events-none z-20">
                <div className="w-full h-full opacity-20">
                  <div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 sm:w-20 h-px bg-cyan-400"
                    style={{
                      transform: `translateX(${dragPosition * 0.3}px) translateY(-50%)`,
                    }}
                  />
                  <div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-12 sm:h-20 bg-cyan-400"
                    style={{
                      transform: `translateX(${dragPosition * 0.3}px) translateY(-50%)`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Skills Summary - Mobile responsive */}
        <div 
          ref={summaryRef}
          className={`text-center transition-all duration-1000 ${
            summaryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl sm:rounded-2xl p-4 sm:p-8 max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
              Always Learning, Always Growing
            </h3>
            <p className="text-sm sm:text-base text-slate-300 mb-4 sm:mb-6 leading-relaxed">
              Technology evolves rapidly, and so do I. I'm constantly expanding my skill set, 
              exploring new frameworks, and mastering emerging technologies to deliver cutting-edge solutions.
              <span className="block mt-2 sm:mt-3 text-cyan-400 font-semibold text-xs sm:text-sm">
                💡 Pro tip: {isMobile ? 'Swipe' : 'Click and drag'} the skills to control their movement!
              </span>
            </p>
            <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
              <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-3 py-2 sm:px-6 sm:py-2 rounded-full font-semibold text-xs sm:text-sm">
                {allSkills.length}+ Technologies
              </span>
              <span className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-3 py-2 sm:px-6 sm:py-2 rounded-full font-semibold text-xs sm:text-sm">
                Full Stack Ready
              </span>
              <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-2 sm:px-6 sm:py-2 rounded-full font-semibold text-xs sm:text-sm">
                Interactive Control
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations - with mobile optimization */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-scroll {
          animation: scroll ${isMobile ? '40s' : '30s'} linear infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        /* Improved touch handling for mobile */
        @media (max-width: 768px) {
          .animate-scroll {
            animation-duration: 40s;
          }
        }
      `}</style>
    </section>
  );
}