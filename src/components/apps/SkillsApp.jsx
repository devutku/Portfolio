import React from 'react';
import { Code, Server, Database, Cloud } from 'lucide-react';
import './SkillsApp.css';

export default function SkillsApp({ skills }) {
  const getCategoryIcon = (category) => {
    if (category.includes('Frontend')) return <Code size={16} />;
    if (category.includes('Backend')) return <Server size={16} />;
    if (category.includes('Database')) return <Database size={16} />;
    return <Cloud size={16} />;
  };

  return (
    <div className="skills-container">
      <div className="skills-header-banner">
        <h2>🛠️ Core Technical Proficiency</h2>
        <p>A structured breakdown of languages, frameworks, system architectures, and cloud tools I leverage to build scalable, resilient, and responsive digital solutions.</p>
      </div>

      <div className="skills-categories-grid">
        {skills.map((cat, idx) => (
          <div key={idx} className="skill-category-card">
            <div className="category-title">
              <span>{cat.category}</span>
              {getCategoryIcon(cat.category)}
            </div>

            <div className="skill-items-list">
              {cat.items.map((skill, sIdx) => (
                <div key={sIdx} className="skill-item">
                  <div className="skill-meta">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-pct">{skill.level}%</span>
                  </div>
                  <div className="progress-track">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
