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

// Premium Skill Badge Component
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
      <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-xl blur-sm transition-opacity duration-300 ${
        isDragging ? 'opacity-40' : 'opacity-0 group-hover:opacity-60'
      }`} />
      
      {/* Main badge - Premium style */}
      <div className={`relative bg-gray-900 backdrop-blur-sm border rounded-xl px-3 py-3 sm:px-4 sm:py-4 shadow-lg transition-all duration-300 ${
        isDragging ? 'border-red-400' : 'border-gray-700 group-hover:border-cyan-400'
      }`}>
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-xl transition-opacity duration-300 ${
          isDragging ? 'opacity-15' : 'opacity-0 group-hover:opacity-20'
        }`} />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <span className={`text-lg sm:text-2xl transform transition-transform duration-300 ${
            isHovered || isDragging ? 'scale-125 rotate-12' : 'scale-100'
          }`}>
            {skill.icon}
          </span>
          <div className="text-center">
            <span className={`block font-serif font-semibold text-sm transition-all duration-300 ${
              isDragging ? 'text-red-400' : 'text-white group-hover:text-cyan-400'
            }`}>
              {skill.name}
            </span>
            <div className="flex items-center justify-center gap-1 mt-1">
              <div className="w-8 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ${
                    isDragging ? 'animate-pulse' : ''
                  }`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <span className={`text-xs transition-colors duration-300 font-serif ${
                isDragging ? 'text-red-400' : 'text-purple-400'
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

// Main Skills Component - Premium Black Card Style
export default function PremiumSkills() {
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
    
    const sensitivity = isMobile ? 0.8 : 0.5;
    const newPosition = dragPosition + deltaX * sensitivity;
    setDragPosition(newPosition);
    
    if (deltaTime > 0) {
      const newVelocity = deltaX / deltaTime * (isMobile ? 15 : 10);
      setVelocity(newVelocity);
    }
    
    setLastPosition(clientX);
    setLastMoveTime(currentTime);
  };

  // Handle drag end with momentum
  const handleDragEnd = () => {
    setIsDragging(false);
    
    let momentum = velocity;
    const decay = isMobile ? 0.92 : 0.95;
    const minMomentum = isMobile ? 0.2 : 0.1;
    
    const momentumInterval = setInterval(() => {
      setDragPosition((prev) => prev + momentum);
      momentum *= decay;
      
      if (Math.abs(momentum) < minMomentum) {
        clearInterval(momentumInterval);
        setVelocity(0);
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
      const skillWidth = isMobile ? 120 : 160;
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8 bg-gray-700"
    >
      {/* Floating particles for premium ambiance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, #60a5fa, #a855f7, #ec4899)`,
              animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main content container - Premium Card */}
      <div className="relative z-10 w-full max-w-8xl mx-auto">
        <div className={`transform transition-all duration-1000 ${titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Premium Black Card */}
          <div className="bg-black rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 relative overflow-hidden border-4 border-gray-800">
            
            {/* Subtle inner glow */}
            <div className="absolute inset-4 border border-gray-700 rounded-2xl pointer-events-none opacity-30"></div>
            
            {/* Card Content */}
            <div className="relative z-10 space-y-6">
              
              {/* Section Header */}
              <div ref={titleRef} className="text-center space-y-3">
                <div className="inline-block px-6 py-2 bg-red-600 text-white text-sm font-medium tracking-widest uppercase rounded-full shadow-lg">
                  Technical Expertise
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                  {skillsConfig.title}
                </h2>
                
                <div className="w-24 h-1 bg-red-600 mx-auto"></div>
                
                <p className="text-lg text-red-500 font-serif font-semibold">
                  {skillsConfig.subtitle}
                </p>
              </div>

              {/* Interactive Skills Carousel */}
              <div 
                ref={scrollRef} 
                className={`transition-all duration-1000 ${
                  scrollVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div 
                  ref={scrollContainerRef}
                  className="relative overflow-hidden py-6 select-none"
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
                  
                  {/* Gradient overlays */}
                  <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
                  <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
                </div>
              </div>

              {/* Skills Summary */}
              <div 
                ref={summaryRef}
                className={`text-center transition-all duration-1000 ${
                  summaryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-3xl mx-auto">
                  <h3 className="text-xl font-serif font-bold text-cyan-400 mb-3">
                    Always Learning, Always Growing
                  </h3>
                  <p className="text-sm text-gray-300 mb-4 leading-relaxed font-serif">
                    Technology evolves rapidly, and so do I. I'm constantly expanding my skill set, 
                    exploring new frameworks, and mastering emerging technologies to deliver cutting-edge solutions.
                  </p>
                  <p className="text-xs text-purple-400 font-serif mb-4">
                    💡 Pro tip: {isMobile ? 'Swipe' : 'Click and drag'} the skills to control their movement!
                  </p>
                  <div className="flex justify-center gap-2 flex-wrap">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full font-serif font-semibold text-xs">
                      {allSkills.length}+ Technologies
                    </span>
                    <span className="bg-cyan-600 text-white px-3 py-1 rounded-full font-serif font-semibold text-xs">
                      Full Stack Ready
                    </span>
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full font-serif font-semibold text-xs">
                      Interactive Control
                    </span>
                  </div>
                </div>
              </div>

              {/* Professional Footer */}
              <div className="border-t border-gray-700 pt-4 mt-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs font-serif">
                  <div className="text-cyan-400">Continuous Learning</div>
                  <div className="text-purple-400">Modern Technologies</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-scroll {
          animation: scroll ${isMobile ? '40s' : '30s'} linear infinite;
        }

        @media (max-width: 768px) {
          .animate-scroll {
            animation-duration: 40s;
          }
        }
      `}</style>
    </section>
  );
}