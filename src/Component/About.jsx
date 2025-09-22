import React, { useState, useEffect, useRef } from 'react';

// Configuration object for easy customization
const aboutConfig = {
  title: "About Me",
  subtitle: "Crafting Digital Excellence",
  description: [
    "I am a passionate MERN stack developer who thrives on transforming complex ideas into elegant, scalable web solutions. With a deep love for clean code and innovative design, I bridge the gap between functionality and aesthetics.",
    "My journey in web development is driven by curiosity and a commitment to excellence. I specialize in creating seamless user experiences while building robust, efficient backend systems that stand the test of time."
  ],
  skills: [
    { name: "Frontend Development", level: 95, color: "from-cyan-400 to-blue-500" },
    { name: "Backend Architecture", level: 90, color: "from-purple-400 to-pink-500" },
    { name: "Database Design", level: 85, color: "from-green-400 to-emerald-500" },
    { name: "UI/UX Design", level: 80, color: "from-orange-400 to-red-500" }
  ],
  technologies: [
    { name: "MongoDB", icon: "🍃", category: "Database" },
    { name: "Express", icon: "🚂", category: "Backend" },
    { name: "React", icon: "⚛️", category: "Frontend" },
    { name: "Node.js", icon: "🟢", category: "Backend" }
  ]
};

// Intersection Observer Hook for animations
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

// Skill Bar Component - Premium Style
const SkillBar = ({ skill, index, isVisible }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setWidth(skill.level);
      }, index * 200);
      return () => clearTimeout(timer);
    }
  }, [isVisible, skill.level, index]);

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-300 font-serif font-medium group-hover:text-white transition-colors duration-300">
          {skill.name}
        </span>
        <span className="text-sm text-cyan-400 font-serif font-semibold">{skill.level}%</span>
      </div>
      <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
        <div
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out transform origin-left shadow-sm`}
          style={{
            width: `${width}%`,
            transform: `scaleX(${width / 100})`
          }}
        />
      </div>
    </div>
  );
};

// Technology Card Component - Premium Style
const TechCard = ({ tech, index, isVisible }) => {
  return (
    <div
      className={`group bg-gray-900 border border-gray-700 rounded-xl p-4 hover:border-red-600 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 text-center ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="text-2xl mb-2 group-hover:animate-bounce">{tech.icon}</div>
      <h4 className="font-serif font-semibold text-cyan-400 mb-1 text-sm">{tech.name}</h4>
      <span className="text-xs text-purple-400 bg-gray-800 px-2 py-1 rounded-full font-serif">
        {tech.category}
      </span>
    </div>
  );
};

// Main About Component - Premium Black Card Style
export default function PremiumAbout() {
  const [titleRef, titleVisible] = useIntersectionObserver(0.1);
  const [contentRef, contentVisible] = useIntersectionObserver(0.1);
  const [skillsRef, skillsVisible] = useIntersectionObserver(0.1);
  const [techRef, techVisible] = useIntersectionObserver(0.1);

  return (
    <section 
      id="about" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8 bg-gray-700"
    >
      {/* Floating particles for premium ambiance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
          <div className="bg-black rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden border-4 border-gray-800">
            
            {/* Subtle inner glow */}
            <div className="absolute inset-4 border border-gray-700 rounded-2xl pointer-events-none opacity-30"></div>
            
            {/* Card Content */}
            <div className="relative z-10 space-y-8">
              
              {/* Section Header */}
              <div ref={titleRef} className="text-center space-y-3">
                <div className="inline-block px-6 py-2 bg-red-600 text-white text-sm font-medium tracking-widest uppercase rounded-full shadow-lg">
                  Professional Profile
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                  {aboutConfig.title}
                </h2>
                
                <div className="w-24 h-1 bg-red-600 mx-auto"></div>
                
                <p className="text-lg sm:text-xl text-red-500 font-serif font-semibold">
                  {aboutConfig.subtitle}
                </p>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                
                {/* Description Section */}
                <div ref={contentRef} className="space-y-6">
                  <h3 className="text-xl font-serif font-bold text-cyan-400 mb-4">
                    My Journey
                  </h3>
                  
                  {aboutConfig.description.map((paragraph, index) => (
                    <p
                      key={index}
                      className={`text-base text-gray-300 leading-relaxed font-serif transition-all duration-1000 ${
                        contentVisible
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-8"
                      }`}
                      style={{ animationDelay: `${index * 0.3}s` }}
                    >
                      {paragraph}
                    </p>
                  ))}

                  {/* Professional Quote */}
                  <blockquote className={`border-l-4 border-red-600 pl-4 italic text-purple-300 font-serif text-sm mt-6 transition-all duration-1000 delay-600 ${
                    contentVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}>
                    "Excellence is not a skill, it's an attitude toward crafting digital solutions."
                  </blockquote>

                  {/* Call to Action */}
                  <div className={`pt-6 transition-all duration-1000 delay-800 ${
                    contentVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-serif font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-red-600/30"
                    >
                      Let's Connect
                      <span className="animate-bounce">→</span>
                    </a>
                  </div>
                </div>

                {/* Skills Section */}
                <div ref={skillsRef} className="space-y-6">
                  <h3 className={`text-xl font-serif font-bold text-cyan-400 mb-6 transition-all duration-1000 ${
                    skillsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  }`}>
                    Technical Expertise
                  </h3>
                  
                  <div className="space-y-6">
                    {aboutConfig.skills.map((skill, index) => (
                      <div key={skill.name} className={`transition-all duration-1000 ${
                        skillsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                      }`} style={{ animationDelay: `${index * 0.5}s` }}>
                        <SkillBar
                          skill={skill}
                          index={index}
                          isVisible={skillsVisible}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technologies Section */}
              <div ref={techRef} className="space-y-6">
                <div className="text-center">
                  <h3 className={`text-2xl font-serif font-bold text-cyan-400 mb-2 transition-all duration-1000 ${
                    techVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}>
                    Technologies I Master
                  </h3>
                  <div className="w-16 h-1 bg-purple-600 mx-auto mb-8"></div>
                </div>
                
                <div className="flex justify-center">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
                    {aboutConfig.technologies.map((tech, index) => (
                      <TechCard
                        key={tech.name}
                        tech={tech}
                        index={index}
                        isVisible={techVisible}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Professional Footer */}
              <div className="border-t border-gray-700 pt-6 mt-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs font-serif">
                  <div className="text-cyan-400">Passionate Developer</div>
                  <div className="text-purple-400">Ready for New Challenges</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}