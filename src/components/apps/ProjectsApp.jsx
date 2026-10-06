import React, { useState } from 'react';
import { ExternalLink, Search, Star } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import './ProjectsApp.css';

export default function ProjectsApp({ projects }) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Full Stack', 'Web App', 'Interactive', 'DevOps'];

  const filteredProjects = projects.filter((p) => {
    const matchesCat = filter === 'All' || p.category === filter;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="projects-container">
      {/* Filter and Search Toolbar */}
      <div className="projects-toolbar">
        <div className="filter-group">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-chip ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="search-box">
          <Search size={14} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="projects-grid">
        {filteredProjects.map((proj) => (
          <div key={proj.id} className="project-card">
            <div className="project-image-box">
              <img src={proj.image} alt={proj.title} />
              <span className="category-tag">{proj.category}</span>
            </div>

            <div className="project-details">
              <h4>{proj.title}</h4>
              <p>{proj.description}</p>

              <div className="project-tags">
                {proj.tags.map((tag, idx) => (
                  <span key={idx} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="project-links">
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="project-btn"
                  >
                    <ExternalLink size={13} /> Live Demo
                  </a>
                )}
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="project-btn secondary"
                  >
                    <GithubIcon size={13} /> Code
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
