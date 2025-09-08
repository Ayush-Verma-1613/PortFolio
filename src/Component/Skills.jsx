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
      { name: "Vercel", icon: "▲", color: "from-black to-gray-700", level: 85 },
      { name: "Render", icon: "🚀", color: "from-purple-500 to-pink-500", level: 80 },
      { name: "AWS", icon: "☁️", color: "from-orange-400 to-yellow-500", level: 75 }
    ],
    "Concepts": [
      { name: "OOP", icon: "🏗️", color: "from-indigo-500 to-purple-600", level: 88 },
      { name: "REST API", icon: "🔌", color: "from-green-400 to-blue-500", level: 90 },
      { name: "GraphQL", icon: "💜", color: "from-pink-500 to-purple-600", level: 75 },
      { name: "DevOps", icon: "⚡", color: "from-cyan-500 to-teal-600", level: 70 }
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

// Skill Badge Component
const SkillBadge = ({ skill, index, onClick, isScrolling }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative flex-shrink-0 mx-2 cursor-pointer transform transition-all duration-300 hover:scale-110 ${
        !isScrolling ? 'animate-pulse' : ''
      }`}
      onClick={() => onClick(skill)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glowing background effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-2xl blur-sm opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
      
      {/* Main badge */}
      <div className={`relative bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-2xl px-6 py-4 group-hover:border-transparent transition-all duration-300 shadow-lg`}>
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300`} />
        
        {/* Content */}
        <div className="relative z-10 flex items-center gap-3">
          <span className={`text-2xl transform transition-transform duration-300 ${
            isHovered ? 'scale-125 rotate-12' : 'scale-100'
          }`}>
            {skill.icon}
          </span>
          <div className="text-left">
            <span className="block text-white font-semibold text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-300 transition-all duration-300">
              {skill.name}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-12 h-1 bg-slate-600 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <span className="text-xs text-slate-400">{skill.level}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skill Category Component
const SkillCategory = ({ category, skills, isVisible }) => {
  return (
    <div className={`mb-12 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      <h3 className="text-2xl font-bold text-center mb-8">
        <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          {category}
        </span>
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className={`group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 transform hover:scale-105 animate-fade-in-up`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-center">
              <div className="text-3xl mb-2 group-hover:animate-bounce">
                {skill.icon}
              </div>
              <h4 className="font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all duration-300">
                {skill.name}
              </h4>
              <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                <div 
                  className={`bg-gradient-to-r ${skill.color} h-2 rounded-full transition-all duration-1000 delay-300`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <span className="text-xs text-slate-400">{skill.level}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Skills Component
export default function Skills() {
  const [titleRef, titleVisible] = useIntersectionObserver(0.1);
  const [scrollRef, scrollVisible] = useIntersectionObserver(0.1);
  const [categoriesRef, categoriesVisible] = useIntersectionObserver(0.1);
  const [isScrolling, setIsScrolling] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleSkillClick = (skill) => {
    setIsScrolling(false);
    setSelectedSkill(skill);
    
    // Resume scrolling after 3 seconds
    setTimeout(() => {
      setIsScrolling(true);
      setSelectedSkill(null);
    }, 3000);
  };

  // Create duplicated array for seamless infinite scroll
  const duplicatedSkills = [...allSkills, ...allSkills, ...allSkills];

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
></div>

      
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
          
          {/* Pause Instruction */}
          <p className={`text-sm text-slate-500 transition-all duration-1000 delay-400 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Click on any skill to pause the animation
          </p>
        </div>

        {/* Continuous Scrolling Skills */}
        <div 
          ref={scrollRef} 
          className={`mb-20 transition-all duration-1000 ${
            scrollVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative overflow-hidden py-8">
            {/* Selected skill overlay */}
            {selectedSkill && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-20">
                <div className="bg-slate-800 border border-cyan-400 rounded-xl p-4 shadow-2xl animate-bounce">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{selectedSkill.icon}</span>
                    <div>
                      <div className="text-white font-semibold">{selectedSkill.name}</div>
                      <div className="text-cyan-400 text-sm">Proficiency: {selectedSkill.level}%</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Scrolling container */}
            <div className={`flex ${isScrolling ? 'animate-scroll' : ''}`}>
              {duplicatedSkills.map((skill, index) => (
                <SkillBadge
                  key={`${skill.name}-${index}`}
                  skill={skill}
                  index={index}
                  onClick={handleSkillClick}
                  isScrolling={isScrolling}
                />
              ))}
            </div>
            
            {/* Gradient overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none z-10" />
          </div>
        </div>

      
        {/* Skills Summary */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-600 ${
          categoriesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Always Learning, Always Growing
            </h3>
            <p className="text-slate-300 mb-6">
              Technology evolves rapidly, and so do I. I'm constantly expanding my skill set, 
              exploring new frameworks, and mastering emerging technologies to deliver cutting-edge solutions.
            </p>
            <div className="flex justify-center gap-4">
              <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold">
                {allSkills.length}+ Technologies
              </span>
              <span className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-2 rounded-full font-semibold">
                Full Stack Ready
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