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
    { name: "Backend Architecture", level: 95, color: "from-purple-400 to-pink-500" },
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
      <div className="flex justify-between items-center mb-1.5 sm:mb-2 md:mb-3">
        <span className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-200 font-serif font-medium group-hover:text-white transition-colors duration-300">
          {skill.name}
        </span>
        <span className="text-[10px] sm:text-xs md:text-sm text-cyan-300 font-serif font-semibold">{skill.level}%</span>
      </div>
      <div className="h-1.5 sm:h-2 md:h-3 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden border border-white/30">
        <div
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out transform origin-left shadow-lg`}
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
      className={`group bg-white/10 backdrop-blur-md border border-white/20 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 hover:border-blue-400 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 text-center ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="text-base sm:text-xl md:text-2xl mb-0.5 sm:mb-1 md:mb-2 group-hover:animate-bounce">{tech.icon}</div>
      <h4 className="font-serif font-semibold text-cyan-300 mb-0.5 sm:mb-1 text-[10px] sm:text-xs md:text-sm">{tech.name}</h4>
      <span className="text-[8px] sm:text-[10px] md:text-xs text-purple-300 bg-white/10 px-1.5 sm:px-2 py-0.5 rounded-full font-serif">
        {tech.category}
      </span>
    </div>
  );
};

// Main About Component
export default function PremiumAbout() {
  const [titleRef, titleVisible] = useIntersectionObserver(0.1);
  const [contentRef, contentVisible] = useIntersectionObserver(0.1);
  const [skillsRef, skillsVisible] = useIntersectionObserver(0.1);
  const [techRef, techVisible] = useIntersectionObserver(0.1);

  return (
    <>
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
        
        /* Desktop Background */
        .about-background-desktop {
          background-image: url(/AboutUs.webp);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        /* Mobile Background - Different Image */
        @media (max-width: 1023px) {
          .about-background-mobile {
            background-image: url(/MobileAboutUs.png);
            background-size: cover;
            background-position: center top;
            background-repeat: no-repeat;
            min-height: 100vh;
          }
          
          #about {
            min-height: auto;
          }
        }
      `}</style>

      <section 
        id="about" 
        className="relative min-h-screen flex items-start justify-center overflow-hidden py-16 sm:py-20 md:py-24 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8"
      >
        {/* Desktop Background */}
        <div className="hidden lg:block absolute inset-0 about-background-desktop"></div>
        
        {/* Mobile Background */}
        <div className="lg:hidden absolute inset-0 about-background-mobile"></div>
        
        {/* Subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Main content container - Positioned higher on mobile */}
        <div className="relative z-10 w-full max-w-7xl mx-auto mt-8 sm:mt-12 lg:mt-0">
          <div className={`transform transition-all duration-1000 ${titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Content without background card */}
            <div className="relative space-y-4 sm:space-y-6 md:space-y-8">
              
              {/* Section Header */}
              <div ref={titleRef} className="text-center space-y-1.5 sm:space-y-2 md:space-y-3">
                <div className="inline-block px-3 py-1 sm:px-4 sm:py-1 md:px-6 md:py-2 bg-white/10 backdrop-blur-md text-white text-[10px] sm:text-xs md:text-sm font-medium tracking-widest uppercase rounded-full shadow-lg border border-white/20">
                  Professional Profile
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-white leading-tight drop-shadow-2xl">
                  {aboutConfig.title}
                </h2>
                
                <div className="w-12 sm:w-16 md:w-24 h-0.5 sm:h-0.5 md:h-1 bg-blue-500 mx-auto"></div>
                
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-300 font-serif font-semibold drop-shadow-lg">
                  {aboutConfig.subtitle}
                </p>
              </div>

              {/* Main Content Grid - Mobile Responsive */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                
                {/* Description Section */}
                <div ref={contentRef} className="space-y-3 sm:space-y-4 md:space-y-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold text-cyan-300 mb-2 sm:mb-3 md:mb-4 drop-shadow-lg">
                    My Journey
                  </h3>
                  
                  {aboutConfig.description.map((paragraph, index) => (
                    <p
                      key={index}
                      className={`text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-200 leading-relaxed font-serif transition-all duration-1000 drop-shadow-md ${
                        contentVisible
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-8"
                      }`}
                      style={{ transitionDelay: `${index * 0.3}s` }}
                    >
                      {paragraph}
                    </p>
                  ))}

                  {/* Professional Quote */}
                  <blockquote className={`border-l-2 sm:border-l-2 md:border-l-4 border-blue-500 pl-2 sm:pl-3 md:pl-4 italic text-purple-200 font-serif text-[10px] sm:text-xs md:text-sm mt-3 sm:mt-4 md:mt-6 transition-all duration-1000 drop-shadow-md ${
                    contentVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`} style={{ transitionDelay: '0.6s' }}>
                    "Excellence is not a skill, it's an attitude toward crafting digital solutions."
                  </blockquote>

                  {/* Call to Action */}
                  <div className={`pt-3 sm:pt-4 md:pt-6 transition-all duration-1000 ${
                    contentVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`} style={{ transitionDelay: '0.8s' }}>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg sm:rounded-lg md:rounded-xl font-serif font-semibold text-[10px] sm:text-xs md:text-base hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                    >
                      Let's Connect
                      <span className="animate-bounce">→</span>
                    </a>
                  </div>
                </div>

                {/* Skills Section */}
                <div ref={skillsRef} className="space-y-3 sm:space-y-4 md:space-y-6">
                  <h3 className={`text-base sm:text-lg md:text-xl font-serif font-bold text-cyan-300 mb-3 sm:mb-4 md:mb-6 transition-all duration-1000 drop-shadow-lg ${
                    skillsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  }`}>
                    Technical Expertise
                  </h3>
                  
                  <div className="space-y-3 sm:space-y-4 md:space-y-6">
                    {aboutConfig.skills.map((skill, index) => (
                      <div key={skill.name} className={`transition-all duration-1000 ${
                        skillsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                      }`} style={{ transitionDelay: `${index * 0.2}s` }}>
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
              <div ref={techRef} className="space-y-3 sm:space-y-4 md:space-y-6 pt-3 sm:pt-4 md:pt-8">
                <div className="text-center">
                  <h3 className={`text-base sm:text-xl md:text-2xl font-serif font-bold text-cyan-300 mb-1.5 sm:mb-2 transition-all duration-1000 drop-shadow-lg ${
                    techVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}>
                    Technologies I Master
                  </h3>
                  <div className="w-10 sm:w-12 md:w-16 h-0.5 sm:h-0.5 md:h-1 bg-purple-500 mx-auto mb-4 sm:mb-6 md:mb-8"></div>
                </div>
                
                <div className="flex justify-center">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-2xl w-full">
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
              <div className="border-t border-white/20 pt-3 sm:pt-4 md:pt-6 mt-4 sm:mt-6 md:mt-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] md:text-xs font-serif">
                  <div className="text-cyan-300">Passionate Developer</div>
                  <div className="text-purple-300">Ready for New Challenges</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}