import React, { useState, useEffect, useRef } from 'react';

// Configuration object for easy customization
const aboutConfig = {
  title: "About Me",
  subtitle: "Crafting Digital Excellence",
  description: [
    "I am a passionate MERN stack developer who thrives on transforming complex ideas into elegant, scalable web solutions. With a deep love for clean code and innovative design, I bridge the gap between functionality and aesthetics.",
    "My journey in web development is driven by curiosity and a commitment to excellence. I specialize in creating seamless user experiences while building robust, efficient backend systems that stand the test of time."
  ],
  // stats: [
  //   { number: "50+", label: "Projects Completed", icon: "🚀" },
  //   { number: "3+", label: "Years Experience", icon: "⭐" },
  //   { number: "100%", label: "Client Satisfaction", icon: "💯" },
  //   { number: "24/7", label: "Problem Solving", icon: "🔧" }
  // ],
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
    { name: "Node.js", icon: "🟢", category: "Backend" },
 
    
    // { name: "TypeScript", icon: "📘", category: "Language" },
    // { name: "Next.js", icon: "▲", category: "Framework" },
    // { name: "Tailwind", icon: "🎨", category: "Styling" },
    // { name: "AWS", icon: "☁️", category: "Cloud" }
  ]
};

// Intersection Observer Hook for animations
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

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime;
    const startCount = 0;
    const endCount = parseInt(end.replace(/\D/g, '')) || 0;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setCount(Math.floor(easeOut * endCount));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-bold">
      {end.replace(/\d+/, count.toString())}
    </span>
  );
};

// Skill Bar Component
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
      <div className="flex justify-between items-center mb-2">
        <span className="text-slate-300 font-medium group-hover:text-white transition-colors duration-300">
          {skill.name}
        </span>
        <span className="text-sm text-slate-400">{skill.level}%</span>
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out transform origin-left`}
          style={{
            width: `${width}%`,
            transform: `scaleX(${width / 100})`
          }}
        />
      </div>
    </div>
  );
};

// Technology Card Component
const TechCard = ({ tech, index, isVisible }) => {
  return (
    <div
      className={`group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 transform hover:scale-105 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="text-3xl mb-2 group-hover:animate-bounce">{tech.icon}</div>
      <h4 className="font-semibold text-white mb-1">{tech.name}</h4>
      <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded-full">
        {tech.category}
      </span>
    </div>
  );
};

// Stats Card Component
// const StatsCard = ({ stat, index, isVisible }) => {
//   return (
//     <div
//       className={`group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-purple-400 transition-all duration-300 transform hover:scale-105 ${
//         isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'
//       }`}
//       style={{ animationDelay: `${index * 0.2}s` }}
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//       <div className="relative z-10 text-center">
//         <div className="text-4xl mb-2 group-hover:animate-pulse">{stat.icon}</div>
//         <div className="text-3xl font-bold mb-1">
//           <AnimatedCounter end={stat.number} isVisible={isVisible} />
//         </div>
//         <div className="text-slate-400 text-sm">{stat.label}</div>
//       </div>
//     </div>
//   );
// };

// Main About Component
export default function About() {
  const [titleRef, titleVisible] = useIntersectionObserver(0.1);
  const [contentRef, contentVisible] = useIntersectionObserver(0.1);
  const [statsRef, statsVisible] = useIntersectionObserver(0.1);
  const [skillsRef, skillsVisible] = useIntersectionObserver(0.1);
  const [techRef, techVisible] = useIntersectionObserver(0.1);

  return (
    <section 
      id="about" 
      className="relative py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div
  className="absolute inset-0 opacity-50"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  }}
>
    </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
  
  {/* Section Header */}
  <div ref={titleRef} className="text-center mb-12 sm:mb-16">
    <h2
      className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 transition-all duration-1000 ${
        titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        {aboutConfig.title}
      </span>
    </h2>
    <p
      className={`text-base sm:text-lg md:text-xl text-slate-400 transition-all duration-1000 delay-200 ${
        titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {aboutConfig.subtitle}
    </p>
  </div>

  {/* Main Content Grid */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-20">
    
    {/* Description */}
    <div ref={contentRef} className="space-y-4 sm:space-y-6">
      {aboutConfig.description.map((paragraph, index) => (
        <p
          key={index}
          className={`text-base sm:text-lg text-slate-300 leading-relaxed transition-all duration-1000 ${
            contentVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-8"
          }`}
          style={{ animationDelay: `${index * 0.3}s` }}
        >
          {paragraph}
        </p>
      ))}

      {/* Call to Action */}
      <div
        className={`pt-4 sm:pt-6 transition-all duration-1000 delay-600 ${
          contentVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-8"
        }`}
      >
        <a
          href="#contact"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
        >
          Let’s Connect
          <span className="animate-bounce">→</span>
        </a>
      </div>
    </div>

    {/* Skills Section */}
    <div ref={skillsRef} className="space-y-5 sm:space-y-6">
      <h3
        className={`text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 transition-all duration-1000 ${
          skillsVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-8"
        }`}
      >
        Technical Expertise
      </h3>
      <div className="space-y-5 sm:space-y-6">
        {aboutConfig.skills.map((skill, index) => (
          <SkillBar
            key={skill.name}
            skill={skill}
            index={index}
            isVisible={skillsVisible}
          />
        ))}
      </div>
    </div>
  </div>

  {/* Technologies Section */}
  <div ref={techRef}>
    <h3
      className={`text-2xl sm:text-3xl font-bold text-center text-white mb-8 sm:mb-12 transition-all duration-1000 ${
        techVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      Technologies I Love
    </h3>
    <div className="flex justify-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 max-w-md sm:max-w-2xl">
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
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}