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

// Simple Skill Badge Component
const SkillBadge = ({ skill, index, isDragging }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative flex-shrink-0 mx-2 transform transition-all duration-300 ${
        isDragging ? 'scale-105' : 'hover:scale-110'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glowing background effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-2xl blur-sm transition-opacity duration-300 ${
        isDragging ? 'opacity-40' : 'opacity-0 group-hover:opacity-60'
      }`} />
      
      {/* Main badge */}
      <div className={`relative bg-slate-800/90 backdrop-blur-sm border rounded-2xl px-6 py-4 shadow-lg transition-all duration-300 ${
        isDragging ? 'border-cyan-400' : 'border-slate-700 group-hover:border-transparent'
      }`}>
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-2xl transition-opacity duration-300 ${
          isDragging ? 'opacity-15' : 'opacity-0 group-hover:opacity-20'
        }`} />
        
        {/* Content */}
        <div className="relative z-10 flex items-center gap-3">
          <span className={`text-2xl transform transition-transform duration-300 ${
            isHovered || isDragging ? 'scale-125 rotate-12' : 'scale-100'
          }`}>
            {skill.icon}
          </span>
          <div className="text-left">
            <span className={`block font-semibold text-lg transition-all duration-300 ${
              isDragging ? 'text-cyan-300' : 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-300'
            }`}>
              {skill.name}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-12 h-1 bg-slate-600 rounded-full overflow-hidden">
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

// Main Skills Component
export default function Skills() {
  const [titleRef, titleVisible] = useIntersectionObserver(0.1);
  const [scrollRef, scrollVisible] = useIntersectionObserver(0.1);
  const [summaryRef, summaryVisible] = useIntersectionObserver(0.1);
  
  // Drag control states
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [dragStartX, setDragStartX] = useState(0);
  const [velocity, setVelocity] = useState(0); // For momentum
  const scrollContainerRef = useRef(null);

  // Create duplicated array for seamless infinite scroll
  const duplicatedSkills = [...allSkills, ...allSkills, ...allSkills];

  // Handle drag start
  const handleDragStart = (e) => {
    setIsDragging(true);
    setIsAutoScrolling(false);
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
    setVelocity(0); // Reset velocity on drag start
    e.preventDefault();
  };

  // Handle drag move
  const handleDragMove = (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartX;
    
    // Improved sensitivity and smoother drag
    const newPosition = dragPosition + deltaX * 0.5; // Reduced sensitivity for smoother control
    setDragPosition(newPosition);
    
    // Update velocity for momentum
    setVelocity(deltaX * 0.1);
    setDragStartX(clientX); // Update start position for next move
  };

  // Handle drag end with momentum
  const handleDragEnd = () => {
    setIsDragging(false);
    
    // Apply momentum
    let momentum = velocity;
    const decay = 0.95; // Decay factor for momentum
    const momentumInterval = setInterval(() => {
      setDragPosition((prev) => prev + momentum);
      momentum *= decay;
      
      if (Math.abs(momentum) < 0.1) {
        clearInterval(momentumInterval);
        setVelocity(0);
        // Resume auto-scrolling after momentum stops
        setTimeout(() => {
          setIsAutoScrolling(true);
        }, 500);
      }
    }, 16); // ~60fps
  };

  // Get direction indicator
  const getDirection = () => {
    if (!isDragging) return '';
    if (velocity > 1) return 'Forward →';
    if (velocity < -1) return '← Backward';
    return 'Paused ⏸️';
  };

  // Auto-scroll reset for seamless looping
  useEffect(() => {
    if (!isAutoScrolling || isDragging) return;

    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const checkScroll = () => {
      const scrollWidth = scrollContainer.scrollWidth / 3; // Since we tripled the skills
      const scrollPosition = scrollContainer.getBoundingClientRect().left;

      if (scrollPosition <= -scrollWidth) {
        scrollContainer.style.transition = 'none';
        scrollContainer.style.transform = 'translateX(0)';
        setTimeout(() => {
          scrollContainer.style.transition = 'transform 0.1s linear';
        }, 0);
      }
    };

    const interval = setInterval(checkScroll, 100);
    return () => clearInterval(interval);
  }, [isAutoScrolling, isDragging]);

  return (
    <section 
      id="skills" 
      className="relative py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className={`text-5xl font-black mb-4 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {skillsConfig.title}
            </span>
          </h2>
          <p className={`text-xl text-slate-400 mb-8 transition-all duration-1000 delay-200 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {skillsConfig.subtitle}
          </p>
          
          {/* Drag Control Instructions */}
          <div className={`text-sm text-slate-500 transition-all duration-1000 delay-400 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
           
          </div>
        </div>

        {/* Draggable Scrolling Skills */}
        <div 
          ref={scrollRef} 
          className={`mb-20 transition-all duration-1000 ${
            scrollVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            ref={scrollContainerRef}
            className="relative overflow-hidden py-8 select-none"
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
              touchAction: 'none' // Prevent default touch behaviors
            }}
          >
            {/* Direction indicator */}
          
            {/* Scrolling container with drag control */}
            <div 
              className={`flex transition-transform duration-100 ${
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
            
            {/* Enhanced gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none z-10" />
            
            {/* Drag indication lines */}
            {isDragging && (
              <div className="absolute inset-0 pointer-events-none z-20">
                <div className="w-full h-full opacity-20">
                  <div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-px bg-cyan-400"
                    style={{
                      transform: `translateX(${dragPosition * 0.5}px) translateY(-50%)`,
                    }}
                  />
                  <div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-20 bg-cyan-400"
                    style={{
                      transform: `translateX(${dragPosition * 0.5}px) translateY(-50%)`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Skills Summary */}
        <div 
          ref={summaryRef}
          className={`text-center transition-all duration-1000 ${
            summaryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Always Learning, Always Growing
            </h3>
            <p className="text-slate-300 mb-6">
              Technology evolves rapidly, and so do I. I'm constantly expanding my skill set, 
              exploring new frameworks, and mastering emerging technologies to deliver cutting-edge solutions.
              <span className="block mt-3 text-cyan-400 font-semibold">
                💡 Pro tip: Click and drag the skills to control their movement!
              </span>
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold">
                {allSkills.length}+ Technologies
              </span>
              <span className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-2 rounded-full font-semibold">
                Full Stack Ready
              </span>
              <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-full font-semibold">
                Interactive Control
              </span>
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
          animation: scroll 30s linear infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}