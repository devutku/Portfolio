import React from 'react';
import { User, Briefcase, GraduationCap, Download, Mail, MapPin, Award, CheckCircle2 } from 'lucide-react';
import './AboutApp.css';

export default function AboutApp({ user, about, onOpenContact }) {
  return (
    <div className="about-container">
      {/* Header Profile summary */}
      <div className="about-hero">
        <div className="about-avatar-frame">
          <img src={user.avatar} alt={user.fullName || user.name} />
        </div>
        <div className="about-hero-details">
          <h2>{user.fullName || user.name}</h2>
          <div className="hero-title">{user.title}</div>
          <div className="hero-badges">
            <span className="badge-tag"><MapPin size={12} style={{ display: 'inline', marginRight: 4 }} />{user.location}</span>
            <span className="badge-tag">🟢 {user.status}</span>
          </div>
        </div>
      </div>

      {/* Stats Counter */}
      <div className="about-stats-grid">
        {about.highlights.map((item, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-value">{item.value}</div>
            <div className="stat-label">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Main Body */}
      <div className="about-sections">
        <div className="section-block">
          <h3><User size={18} /> Professional Biography</h3>
          <p className="bio-paragraph">{about.summary}</p>
          
          <div className="about-actions">
            <button className="action-btn" onClick={onOpenContact}>
              <Mail size={15} /> Get In Touch
            </button>
            <a 
              href="#resume" 
              className="action-btn secondary"
              onClick={(e) => {
                e.preventDefault();
                alert("Resume document viewed / downloaded!");
              }}
            >
              <Download size={15} /> Download Resume (.PDF)
            </a>
          </div>
        </div>

        {/* Certifications */}
        {about.certifications && (
          <div className="section-block">
            <h3><Award size={18} /> Certifications & Credentials</h3>
            <div className="cert-grid">
              {about.certifications.map((cert, idx) => (
                <div key={idx} className="cert-card">
                  <div className="cert-icon-wrapper">
                    <CheckCircle2 size={18} />
                  </div>
                  <div className="cert-info">
                    <h4>{cert.title}</h4>
                    <div className="cert-issuer">{cert.issuer}</div>
                    <div className="cert-desc">{cert.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Timeline */}
        <div className="section-block">
          <h3><Briefcase size={18} /> Professional Experience</h3>
          <div className="timeline">
            {about.experience.map((exp, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-period">{exp.period}</div>
                <div className="timeline-role">{exp.role}</div>
                <div className="timeline-company">{exp.company}</div>
                <div className="timeline-desc">{exp.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="section-block">
          <h3><GraduationCap size={18} /> Education</h3>
          <div className="timeline">
            {about.education.map((edu, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-period">{edu.period}</div>
                <div className="timeline-role">{edu.degree}</div>
                <div className="timeline-company">{edu.institution}</div>
                <div className="timeline-desc">{edu.notes}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
