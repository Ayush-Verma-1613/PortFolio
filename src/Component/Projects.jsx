import React, { useState, useEffect, useRef } from 'react';

// Configuration object for easy customization
const projectsConfig = {
  title: "Featured Projects",
  subtitle: "Bringing Ideas to Life",
  projects: [
    {
      id: 1,
      title: "E-commerce Store",
      description: "A comprehensive MERN stack e-commerce platform featuring secure authentication, payment processing, inventory management, and a responsive shopping experience.",
      longDescription: "Built with React for the frontend and Node.js/Express for the backend, this platform includes features like user authentication, shopping cart, payment integration with Stripe, order tracking, and an admin dashboard for inventory management.",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
      category: "Full Stack",
      image: "🛍️",
      gradient: "from-purple-500 to-pink-500",
      link: "#",
      github: "#",
      status: "Live",
      year: "2024",
      highlights: ["Payment Integration", "Real-time Updates", "Admin Dashboard", "Mobile Responsive"]
    },
    {
      id: 2,
      title: "Task Manager Pro",
      description: "An advanced productivity application with real-time collaboration, task scheduling, team management, and comprehensive analytics dashboard.",
      longDescription: "A sophisticated task management system built with the MERN stack, featuring drag-and-drop functionality, real-time collaboration, advanced filtering, priority management, and detailed analytics for productivity tracking.",
      tech: ["React", "Express", "MongoDB", "Socket.io", "Chart.js"],
      category: "Productivity",
      image: "📋",
      gradient: "from-cyan-500 to-blue-500",
      link: "#",
      github: "#",
      status: "Live",
      year: "2024",
      highlights: ["Real-time Collaboration", "Drag & Drop", "Analytics Dashboard", "Team Management"]
    },
    {
      id: 3,
      title: "Social Media Dashboard",
      description: "A comprehensive social media analytics platform with multi-platform integration, real-time monitoring, and AI-powered insights.",
      longDescription: "An all-in-one social media management tool that aggregates data from multiple platforms, provides detailed analytics, schedules posts, and offers AI-powered insights for content optimization.",
      tech: ["React", "Node.js", "PostgreSQL", "Redis", "OpenAI API"],
      category: "Analytics",
      image: "📊",
      gradient: "from-emerald-500 to-teal-500",
      link: "#",
      github: "#",
      status: "Development",
      year: "2024",
      highlights: ["Multi-platform Integration", "AI Insights", "Real-time Analytics", "Post Scheduling"]
    },
    {
      id: 4,
      title: "Learning Management System",
      description: "A modern LMS platform with video streaming, interactive quizzes, progress tracking, and comprehensive course management.",
      longDescription: "A full-featured learning management system supporting video content delivery, interactive assessments, student progress tracking, course creation tools, and integrated communication features.",
      tech: ["Next.js", "Node.js", "MongoDB", "AWS S3", "WebRTC"],
      category: "Education",
      image: "🎓",
      gradient: "from-orange-500 to-red-500",
      link: "#",
      github: "#",
      status: "Live",
      year: "2023",
      highlights: ["Video Streaming", "Interactive Quizzes", "Progress Tracking", "Course Builder"]
    }
  ],
  categories: ["All", "Full Stack", "Productivity", "Analytics", "Education"]
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

// Project Card Component
const ProjectCard = ({ project, index, isVisible, isExpanded, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden hover:border-cyan-400 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
      }`}
      style={{ animationDelay: `${index * 0.2}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      
      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-20">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          project.status === 'Live' 
            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
            : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
        }`}>
          {project.status}
        </span>
      </div>

      {/* Card Content */}
      <div className="relative z-10 p-8">
        
        {/* Project Icon & Title */}
        <div className="flex items-start gap-4 mb-6">
          <div className={`text-6xl transform transition-transform duration-300 ${
            isHovered ? 'scale-110 rotate-12' : 'scale-100'
          }`}>
            {project.image}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all duration-300">
                {project.title}
              </h3>
              <span className="text-sm text-slate-500">{project.year}</span>
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${project.gradient} bg-opacity-20 text-white border border-white/20`}>
              {project.category}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-300 leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
          {isExpanded ? project.longDescription : project.description}
        </p>

        {/* Highlights */}
        {isExpanded && (
          <div className="mb-6 animate-fade-in">
            <h4 className="text-sm font-semibold text-cyan-400 mb-3">Key Features:</h4>
            <div className="grid grid-cols-2 gap-2">
              {project.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="text-cyan-400">✓</span>
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-slate-400 mb-3">Tech Stack:</h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm font-medium hover:bg-slate-600 hover:text-white transition-colors duration-200 transform hover:scale-105"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <a
            href={project.link}
            className={`flex-1 bg-gradient-to-r ${project.gradient} text-white px-6 py-3 rounded-xl font-semibold text-center hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105`}
          >
            View Live →
          </a>
          <a
            href={project.github}
            className="px-6 py-3 border border-slate-600 text-slate-300 rounded-xl font-semibold hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-105"
          >
            Code
          </a>
          <button
            onClick={() => onToggle(project.id)}
            className="px-4 py-3 text-slate-400 hover:text-cyan-400 transition-colors duration-300"
            title={isExpanded ? "Show Less" : "Show More"}
          >
            {isExpanded ? "↑" : "↓"}
          </button>
        </div>
      </div>

      {/* Animated Border Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.gradient} opacity-20 blur-xl`} />
      </div>
    </div>
  );
};

// Filter Button Component
const FilterButton = ({ category, isActive, onClick, count }) => (
  <button
    onClick={() => onClick(category)}
    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
      isActive
        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-600'
    }`}
  >
    {category} {count > 0 && `(${count})`}
  </button>
);

// Main Projects Component
export default function Projects() {
  const [titleRef, titleVisible] = useIntersectionObserver(0.1);
  const [projectsRef, projectsVisible] = useIntersectionObserver(0.1);
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
      className="relative py-20 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 overflow-hidden"
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
              {projectsConfig.title}
            </span>
          </h2>
          <p className={`text-xl text-slate-400 mb-8 transition-all duration-1000 delay-200 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {projectsConfig.subtitle}
          </p>

          {/* Filter Buttons */}
          <div className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-400 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
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

        {/* Projects Grid */}
        <div ref={projectsRef} className="grid lg:grid-cols-2 gap-8 mb-16">
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
        <div className={`text-center transition-all duration-1000 delay-600 ${
          projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Interested in collaborating?
            </h3>
            <p className="text-slate-300 mb-6">
              I'm always excited to work on new projects and bring innovative ideas to life.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Start a Project
              <span className="animate-bounce">🚀</span>
            </a>
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
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}