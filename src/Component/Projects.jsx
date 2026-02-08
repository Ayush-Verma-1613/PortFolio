import React, { useState, useEffect, useRef } from 'react';

// Configuration object for easy customization
const projectsConfig = {
  title: "Featured Projects",
  subtitle: "Bringing Ideas to Life",
  projects: [
    {
      "id": 1,
      "title": "CodeBase",
      "description": "A dynamic MERN stack platform enabling users to connect based on skills, send connection requests, engage in real-time chat, and edit profiles with a seamless and responsive interface.",
      "longDescription": "Developed using React for an interactive frontend and Node.js/Express for a robust backend, CodeBase facilitates skill-based user connections, real-time chat functionality, profile editing, and secure authentication, all powered by MongoDB for efficient data management.",
      "tech": ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Socket.io"],
      "category": "Full Stack",
      "image": "codeBase.png",
      "gradient": "from-purple-500 to-pink-500",
      "link": "https://full-stack-frontend-tawny.vercel.app/",
      "github": "https://github.com/Ayush-Verma-1613/Full-Stack-Frontend/tree/main",
      "status": "Live",
      "year": "2025",
      "highlights": ["Skill-Based Connections", "Real-Time Chat", "Profile Editing", "Mobile Responsive"]
    },
    {
      "id": 2,
      "title": "IPO Tracker",
      "description": "A modern IPO application displaying live IPO listings with real-time data integration, built with a responsive UI using React and Tailwind CSS.",
      "longDescription": "This IPO tracking platform leverages React for a dynamic frontend, Tailwind CSS for a sleek and responsive design, and API integration to fetch and display live IPO data. The application uses libraries like kuicide-react for enhanced functionality and seamless user experience.",
      "tech": ["React", "Tailwind CSS", "API Integration", "Luicide-react"],
      "category": "Finance",
      "image": "IpoApplication.png",
      "gradient": "from-cyan-500 to-blue-500",
      "link": "https://ipo-application-e67k.vercel.app/",
      "github": "https://github.com/Ayush-Verma-1613/IPO-Application/tree/main",
      "status": "Live",
      "year": "2025",
      "highlights": ["Live IPO Data", "API Integration", "Responsive Design", "Real-Time Updates"]
    },
    {
      "id": 3,
      "title": "ChatBot",
      "description": "An interactive chatbot application powered by the Gemini API, built with HTML, CSS, and JavaScript, allowing users to ask any question and receive intelligent responses.",
      "longDescription": "This chatbot leverages the Gemini API for natural language processing, providing a seamless conversational experience. Built with HTML, CSS, and JavaScript, it features a user-friendly interface and supports dynamic question-and-answer interactions for a wide range of queries.",
      "tech": ["HTML", "CSS", "JavaScript", "Gemini API"],
      "category": "AI",
      "image": "chatBot.png",
      "gradient": "from-emerald-500 to-teal-500",
      "link": "https://chat-bot-git-main-ayush-kumar-vermas-projects-0c8e0b33.vercel.app/",
      "github": "https://github.com/Ayush-Verma-1613/Chat-bot/tree/main",
      "status": "Live",
      "year": "2024",
      "highlights": ["Gemini API Integration", "Interactive Q&A", "Responsive UI", "Real-Time Responses"]
    },
    {
      "id": 4,
      "title": "TextUtils",
      "description": "A text manipulation tool built with React.js, offering features like uppercase conversion, space removal, lowercase conversion, text copying, and a dark mode toggle for enhanced user experience.",
      "longDescription": "TextUtils is a learning project created to explore React.js, featuring a variety of text utilities such as converting text to uppercase or lowercase, removing extra spaces, copying text to the clipboard, and a dark mode toggle for accessibility. The application provides a simple and responsive interface for users to manipulate text efficiently.",
      "tech": ["React", "JavaScript", "CSS"],
      "category": "Utility",
      "image": "TextUtils.png",
      "gradient": "from-blue-500 to-indigo-500",
      "link": "https://textutils-five-blue.vercel.app/",
      "github": "https://github.com/Ayush-Verma-1613/Textutils/tree/main",
      "status": "Live",
      "year": "2023",
      "highlights": ["Text Manipulation", "Dark Mode", "Responsive UI", "React.js Learning"]
    }
  ],
  categories: ["All"]
};

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

// Project Image Component
const ProjectImage = ({ project, isHovered }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-full h-24 xs:h-28 sm:h-32 md:h-36 rounded-lg overflow-hidden bg-gray-800/50 backdrop-blur-sm mb-2 sm:mb-3">
      {!imageError ? (
        <>
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className={`w-full h-full object-cover transition-all duration-700 transform ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-t-2 border-cyan-400"></div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full bg-gray-800/50 flex flex-col items-center justify-center text-gray-400">
          <div className="text-xl sm:text-2xl mb-1">🖼️</div>
          <p className="text-[9px] sm:text-[10px] text-center px-2">Screenshot not available</p>
        </div>
      )}
      
      {/* Overlay gradient */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      {/* Project category badge on image */}
      <div className="absolute bottom-1 left-1 sm:bottom-1.5 sm:left-1.5">
        <span className="px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-medium bg-black/70 backdrop-blur-sm text-cyan-300 border border-cyan-400/30">
          {project.category}
        </span>
      </div>
    </div>
  );
};

// Project Card Component - Premium Style
const ProjectCard = ({ project, index, isVisible, isExpanded, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative bg-white/5 backdrop-blur-md border border-white/20 rounded-lg sm:rounded-xl overflow-hidden hover:border-cyan-400 transition-all duration-500 transform hover:scale-[1.02] ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
      }`}
      style={{ animationDelay: `${index * 0.2}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Status Badge */}
      <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-20">
        <span className={`px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold ${
          project.status === 'Live' 
            ? 'bg-green-500/20 text-green-300 border border-green-500/50' 
            : 'bg-orange-500/20 text-orange-300 border border-orange-500/50'
        }`}>
          {project.status}
        </span>
      </div>

      {/* Card Content - More compact */}
      <div className="relative z-10 p-2 sm:p-3">
        
        {/* Project Screenshot - Smaller */}
        <ProjectImage project={project} isHovered={isHovered} />
        
        {/* Project Title & Year */}
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <h3 className="text-sm sm:text-base font-serif font-bold text-white group-hover:text-cyan-300 transition-all duration-300">
            {project.title}
          </h3>
          <span className="text-[9px] sm:text-[10px] text-purple-300 font-serif">{project.year}</span>
        </div>

        {/* Description - More compact */}
        <p className="text-gray-200 leading-relaxed mb-2 sm:mb-3 text-[10px] sm:text-xs font-serif line-clamp-3">
          {isExpanded ? project.longDescription : project.description}
        </p>

        {/* Highlights - Only show on expanded */}
        {isExpanded && (
          <div className="mb-2 sm:mb-3 animate-fade-in">
            <h4 className="text-[10px] sm:text-xs font-serif font-semibold text-cyan-300 mb-1.5">Key Features:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 sm:gap-1">
              {project.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] text-gray-300">
                  <span className="text-cyan-300 text-[10px]">✓</span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack - More compact */}
        <div className="mb-2 sm:mb-3">
          <h4 className="text-[10px] sm:text-xs font-serif font-semibold text-gray-300 mb-1">Tech Stack:</h4>
          <div className="flex flex-wrap gap-0.5 sm:gap-1">
            {project.tech.map((tech, idx) => (
              <span
                key={idx}
                className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 bg-white/10 backdrop-blur-sm text-cyan-300 rounded-full text-[9px] sm:text-[10px] font-serif font-medium hover:bg-white/20 hover:text-white transition-colors duration-200 border border-white/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons - More compact */}
        <div className="flex flex-col xs:flex-row items-stretch gap-1 sm:gap-1.5">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-cyan-600 text-white px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-md font-serif font-semibold text-center text-[10px] sm:text-xs hover:bg-cyan-700 transition-all duration-300 transform hover:scale-105"
          >
            View Live →
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 border border-purple-400 text-purple-300 rounded-md font-serif font-semibold text-center text-[10px] sm:text-xs hover:bg-purple-500 hover:text-white transition-all duration-300"
          >
            Code
          </a>
          <button
            onClick={() => onToggle(project.id)}
            className="px-2 py-1.5 sm:px-2.5 sm:py-1.5 text-gray-300 hover:text-cyan-300 transition-colors duration-300 rounded-md border border-white/20 hover:border-white/40 text-[9px] sm:text-[10px]"
            title={isExpanded ? "Show Less" : "Show More"}
          >
            {isExpanded ? "Less ↑" : "More ↓"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Filter Button Component - Premium Style
const FilterButton = ({ category, isActive, onClick, count }) => (
  <button
    onClick={() => onClick(category)}
    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-serif font-semibold text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 ${
      isActive
        ? 'bg-cyan-600 text-white shadow-lg'
        : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20 hover:text-white border border-white/20'
    }`}
  >
    {category} {count > 0 && `(${count})`}
  </button>
);

// Main Projects Component
export default function PremiumProjects() {
  const [titleRef, titleVisible] = useIntersectionObserver(0.01);
  const [projectsRef, projectsVisible] = useIntersectionObserver(0.01);
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedProjects, setExpandedProjects] = useState(new Set());

  const filteredProjects = projectsConfig.projects.filter(project =>
    activeFilter === "All" || project.category === activeFilter
  );

  const toggleExpand = (projectId) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const getCategoryCount = (category) => {
    if (category === "All") return projectsConfig.projects.length;
    return projectsConfig.projects.filter(p => p.category === category).length;
  };

  return (
    <section 
      id="projects" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: '#000000'
      }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/featureProjects.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll',
          minHeight: '100vh'
        }}
      ></div>
      
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className={`transform transition-all duration-1000 ${titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Content without background card */}
          <div className="relative space-y-4 sm:space-y-6">
            
            {/* Section Header */}
            <div ref={titleRef} className="text-center space-y-2 sm:space-y-3">
              <div className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-medium tracking-widest uppercase rounded-full shadow-lg border border-white/20">
                Portfolio Showcase
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight drop-shadow-2xl">
                {projectsConfig.title}
              </h2>
              
              <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-cyan-500 mx-auto"></div>
              
              <p className="text-base sm:text-lg md:text-xl text-cyan-300 font-serif font-semibold drop-shadow-lg">
                {projectsConfig.subtitle}
              </p>

              {/* Filter Buttons */}
              <div className="flex justify-center gap-2 sm:gap-3 pt-3 sm:pt-4">
                {projectsConfig.categories.map((category) => (
                  <FilterButton
                    key={category}
                    category={category}
                    isActive={activeFilter === category}
                    onClick={setActiveFilter}
                    count={getCategoryCount(category)}
                  />
                ))}
              </div>
            </div>

            {/* Projects Grid - Mobile Responsive */}
            <div ref={projectsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isVisible={projectsVisible}
                  isExpanded={expandedProjects.has(project.id)}
                  onToggle={toggleExpand}
                />
              ))}
            </div>

            {/* Call to Action */}
            <div className={`text-center pt-4 sm:pt-6 transition-all duration-1000 ${
              projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '0.6s' }}>
              <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-lg sm:rounded-xl p-4 sm:p-6 max-w-2xl mx-auto">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-cyan-300 mb-2 sm:mb-3">
                  Interested in collaborating?
                </h3>
                <p className="text-gray-200 mb-3 sm:mb-4 text-xs sm:text-sm font-serif">
                  I'm always excited to work on new projects and bring innovative ideas to life.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-serif font-semibold text-xs sm:text-sm hover:bg-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                  Start a Project
                  <span className="animate-bounce">🚀</span>
                </a>
              </div>
            </div>

            {/* Professional Footer */}
            <div className="border-t border-white/20 pt-3 sm:pt-4 mt-4 sm:mt-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] sm:text-xs font-serif">
                <div className="text-cyan-300">Creative Solutions</div>
                <div className="text-purple-300">Modern Development</div>
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
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        
        /* Ensure background image displays properly on all devices */
        @media (max-width: 640px) {
          #projects {
            min-height: 100vh;
          }
        }
        
        /* Fix for background image */
        section#projects {
          background-attachment: scroll;
        }
      `}</style>
    </section>
  );
}