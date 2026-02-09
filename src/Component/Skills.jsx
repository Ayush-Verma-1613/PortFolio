import React, { useState, useEffect, useRef } from 'react';

// Configuration object for easy customization
const skillsConfig = {
  title: "Technical Skills",
  subtitle: "Technologies I Master",
  skillCategories: {
    "Frontend": [
      { name: "React", icon: "⚛️", color: "from-blue-400 to-cyan-500", level: 95 },
      { name: "Next.js", icon: "▲", color: "from-gray-300 to-gray-500", level: 90 },
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
      { name: "GitHub", icon: "🐙", color: "from-gray-400 to-gray-600", level: 90 },
      { name: "Vercel", icon: "▲", color: "from-gray-300 to-gray-500", level: 88 },
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
const useIntersectionObserver = (threshold = 0.01) => {
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

// Premium Skill Badge Component - More compact for mobile
const SkillBadge = ({ skill, index, isDragging }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative flex-shrink-0 mx-0.5 sm:mx-1 md:mx-2 transform transition-all duration-300 ${
        isDragging ? 'scale-105' : 'hover:scale-110'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glowing background effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-lg sm:rounded-xl blur-sm transition-opacity duration-300 ${
        isDragging ? 'opacity-40' : 'opacity-0 group-hover:opacity-60'
      }`} />
      
      {/* Main badge - Premium style with glassmorphism - Smaller on mobile */}
      <div className={`relative bg-white/10 backdrop-blur-md border rounded-lg sm:rounded-xl px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4 shadow-lg transition-all duration-300 ${
        isDragging ? 'border-cyan-400' : 'border-white/20 group-hover:border-cyan-400'
      }`}>
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-lg sm:rounded-xl transition-opacity duration-300 ${
          isDragging ? 'opacity-15' : 'opacity-0 group-hover:opacity-20'
        }`} />
        
        {/* Content - More compact on mobile */}
        <div className="relative z-10 flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2">
          <span className={`text-base sm:text-lg md:text-2xl transform transition-transform duration-300 ${
            isHovered || isDragging ? 'scale-125 rotate-12' : 'scale-100'
          }`}>
            {skill.icon}
          </span>
          <div className="text-center">
            <span className={`block font-serif font-semibold text-[10px] sm:text-xs md:text-sm transition-all duration-300 ${
              isDragging ? 'text-cyan-300' : 'text-white group-hover:text-cyan-300'
            }`}>
              {skill.name}
            </span>
            <div className="flex items-center justify-center gap-0.5 sm:gap-1 mt-0.5 sm:mt-1">
              <div className="w-6 sm:w-7 md:w-8 h-0.5 sm:h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ${
                    isDragging ? 'animate-pulse' : ''
                  }`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <span className={`text-[9px] sm:text-[10px] md:text-xs transition-colors duration-300 font-serif ${
                isDragging ? 'text-cyan-300' : 'text-purple-300'
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
export default function PremiumSkills() {
  const [titleRef, titleVisible] = useIntersectionObserver(0.01);
  const [scrollRef, scrollVisible] = useIntersectionObserver(0.01);
  const [summaryRef, summaryVisible] = useIntersectionObserver(0.01);
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
  const duplicatedSkills = [...allSkills, ...allSkills, ...allSkills, ...allSkills];

  // Handle drag start
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

  // Handle drag move
  const handleDragMove = (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const currentTime = Date.now();
    const deltaTime = currentTime - lastMoveTime;
    const deltaX = clientX - lastPosition;
    
    const sensitivity = isMobile ? 1.2 : 0.8;
    const newPosition = dragPosition + deltaX * sensitivity;
    setDragPosition(newPosition);
    
    if (deltaTime > 0) {
      const newVelocity = deltaX / deltaTime * (isMobile ? 20 : 12);
      setVelocity(newVelocity);
    }
    
    setLastPosition(clientX);
    setLastMoveTime(currentTime);
  };

  // Handle drag end with momentum
  const handleDragEnd = () => {
    setIsDragging(false);
    
    let momentum = velocity;
    const decay = isMobile ? 0.90 : 0.95;
    const minMomentum = isMobile ? 0.3 : 0.1;
    
    const momentumInterval = setInterval(() => {
      setDragPosition((prev) => prev + momentum);
      momentum *= decay;
      
      if (Math.abs(momentum) < minMomentum) {
        clearInterval(momentumInterval);
        setVelocity(0);
        setTimeout(() => {
          setIsAutoScrolling(true);
        }, isMobile ? 400 : 600);
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
      const skillWidth = isMobile ? 70 : 140;
      const totalSkillsWidth = allSkills.length * skillWidth;

      if (Math.abs(dragPosition) >= totalSkillsWidth) {
        setDragPosition(0);
      }
    };

    const interval = setInterval(checkScroll, 50);
    return () => clearInterval(interval);
  }, [isAutoScrolling, isDragging, dragPosition, isMobile]);

  return (
    <section 
      id="skills" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8"
    >
      {/* Background Image - Desktop */}
      <div 
        className="hidden sm:block absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/skills.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll'
        }}
      ></div>
      
      {/* Background Image - Mobile */}
      <div 
        className="block sm:hidden absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/MobileSkills.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll'
        }}
      ></div>
      
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className={`transform transition-all duration-1000 ${titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Content without background card - More compact */}
          <div className="relative space-y-3 sm:space-y-4 md:space-y-6">
            
            {/* Section Header - More compact on mobile */}
            <div ref={titleRef} className="text-center space-y-1.5 sm:space-y-2 md:space-y-3">
              <div className="inline-block px-3 py-1 sm:px-4 sm:py-1 md:px-6 md:py-2 bg-white/10 backdrop-blur-md text-white text-[10px] sm:text-xs md:text-sm font-medium tracking-widest uppercase rounded-full shadow-lg border border-white/20">
                Technical Expertise
              </div>
              
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-white leading-tight drop-shadow-2xl px-2">
                {skillsConfig.title}
              </h2>
              
              <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-0.5 sm:h-0.5 md:h-1 bg-cyan-500 mx-auto"></div>
              
              <p className="text-xs sm:text-base md:text-lg lg:text-xl text-cyan-300 font-serif font-semibold drop-shadow-lg px-2">
                {skillsConfig.subtitle}
              </p>
            </div>

            {/* Interactive Skills Carousel - More compact */}
            <div 
              ref={scrollRef} 
              className={`transition-all duration-1000 ${
                scrollVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div 
                ref={scrollContainerRef}
                className="relative overflow-hidden py-3 sm:py-4 md:py-6 select-none"
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
                {/* Scrolling container */}
                <div 
                  className={`flex will-change-transform ${
                    isAutoScrolling && !isDragging ? 'animate-scroll-fast' : ''
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
                
                {/* Gradient overlays - Darker for better visibility */}
                <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 bg-gradient-to-r from-black/80 to-transparent pointer-events-none z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 bg-gradient-to-l from-black/80 to-transparent pointer-events-none z-10" />
              </div>
            </div>

            {/* Skills Summary - More compact on mobile */}
            <div 
              ref={summaryRef}
              className={`text-center transition-all duration-1000 ${
                summaryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 max-w-3xl mx-auto">
                <h3 className="text-sm sm:text-lg md:text-xl font-serif font-bold text-cyan-300 mb-1.5 sm:mb-2 md:mb-3">
                  Always Learning, Always Growing
                </h3>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-200 mb-2 sm:mb-3 md:mb-4 leading-relaxed font-serif px-1">
                  Technology evolves rapidly, and so do I. I'm constantly expanding my skill set, 
                  exploring new frameworks, and mastering emerging technologies to deliver cutting-edge solutions.
                </p>
                <p className="text-[9px] sm:text-[10px] md:text-xs text-purple-300 font-serif mb-2 sm:mb-3 md:mb-4">
                  💡 Pro tip: {isMobile ? 'Swipe' : 'Click and drag'} the skills to control their movement!
                </p>
                <div className="flex justify-center gap-1.5 sm:gap-2 flex-wrap">
                  <span className="bg-cyan-600 text-white px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1 rounded-full font-serif font-semibold text-[9px] sm:text-[10px] md:text-xs">
                    {allSkills.length}+ Technologies
                  </span>
                  <span className="bg-blue-600 text-white px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1 rounded-full font-serif font-semibold text-[9px] sm:text-[10px] md:text-xs">
                    Full Stack Ready
                  </span>
                  <span className="bg-purple-600 text-white px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1 rounded-full font-serif font-semibold text-[9px] sm:text-[10px] md:text-xs">
                    Interactive Control
                  </span>
                </div>
              </div>
            </div>

            {/* Professional Footer - More compact on mobile */}
            <div className="border-t border-white/20 pt-2 sm:pt-3 md:pt-4 mt-3 sm:mt-4 md:mt-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] md:text-xs font-serif">
                <div className="text-cyan-300">Continuous Learning</div>
                <div className="text-purple-300">Modern Technologies</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Custom CSS for fast linear animations */}
      <style jsx>{`
        @keyframes scroll-fast {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-scroll-fast {
          animation: scroll-fast linear infinite;
          animation-duration: ${isMobile ? '15s' : '25s'};
        }

        /* Optimizations for mobile */
        @media (max-width: 768px) {
          .animate-scroll-fast {
            animation-duration: 12s !important;
          }
          
          .will-change-transform {
            will-change: transform;
            backface-visibility: hidden;
            perspective: 1000px;
          }
        }
        
        /* Extra fast for very small screens */
        @media (max-width: 480px) {
          .animate-scroll-fast {
            animation-duration: 10s !important;
          }
        }
        
        /* Ensure background image displays properly */
        section#skills {
          background-attachment: scroll;
        }
        
        @media (max-width: 640px) {
          #skills {
            min-height: 100vh;
          }
        }
      `}</style>
    </section>
  );
}