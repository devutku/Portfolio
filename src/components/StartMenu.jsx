import React, { useState } from 'react';
import { Search, Power, Folder, User, Terminal, Music, Mail, Settings, Trash2, Code2, Globe } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import './StartMenu.css';

export default function StartMenu({
  user,
  taskbarAlign,
  onOpenApp,
  onLock,
  onCloseStart
}) {
  const [search, setSearch] = useState('');

  const pinnedApps = [
    { id: 'about', label: 'About Me', icon: User, color: '#38bdf8' },
    { id: 'projects', label: 'Projects', icon: Folder, color: '#f59e0b' },
    { id: 'skills', label: 'Skills', icon: Code2, color: '#10b981' },
    { id: 'terminal', label: 'Terminal', icon: Terminal, color: '#6366f1' },
    { id: 'spotify', label: 'Spotify', icon: Music, color: '#22c55e' },
    { id: 'contact', label: 'Mail', icon: Mail, color: '#0ea5e9' },
    { id: 'settings', label: 'Settings', icon: Settings, color: '#8b5cf6' },
    { id: 'recycle', label: 'Recycle Bin', icon: Trash2, color: '#ec4899' },
  ];

  const filteredApps = pinnedApps.filter((app) =>
    app.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`start-menu-container ${taskbarAlign === 'left' ? 'align-left' : ''}`} onClick={(e) => e.stopPropagation()}>
      {/* Search Bar */}
      <div className="start-search-bar">
        <div className="start-search-input-box">
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Type here to search apps, skills, projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>
      </div>

      {/* Pinned Section */}
      <div className="start-pinned-section">
        <div className="section-head-row">
          <span>Pinned Applications</span>
        </div>

        <div className="pinned-apps-grid">
          {filteredApps.map((app) => {
            const Icon = app.icon;
            return (
              <div
                key={app.id}
                className="pinned-app-item"
                onClick={() => {
                  soundManager.playClick();
                  onOpenApp(app.id);
                  onCloseStart();
                }}
              >
                <div className="app-icon-badge" style={{ background: `${app.color}25`, border: `1px solid ${app.color}45` }}>
                  <Icon size={22} color={app.color} />
                </div>
                <span className="pinned-app-label">{app.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended items */}
      <div className="start-recommended-section">
        <div className="section-head-row">
          <span>Recommended / Recent</span>
        </div>

        <div className="recommended-grid">
          <div
            className="rec-item"
            onClick={() => {
              onOpenApp('projects');
              onCloseStart();
            }}
          >
            <Folder size={20} color="#f59e0b" />
            <div>
              <div className="rec-item-title">AI Nexus Workspace</div>
              <div className="rec-item-sub">Updated 2 days ago</div>
            </div>
          </div>

          <div
            className="rec-item"
            onClick={() => {
              onOpenApp('about');
              onCloseStart();
            }}
          >
            <User size={20} color="#38bdf8" />
            <div>
              <div className="rec-item-title">Resume & Experience</div>
              <div className="rec-item-sub">PDF Document</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="start-footer">
        <div
          className="start-user-pill"
          onClick={() => {
            onOpenApp('about');
            onCloseStart();
          }}
        >
          <img src={user.avatar} alt={user.fullName || user.name} className="start-user-avatar" />
          <span className="start-user-name">{user.fullName || user.name}</span>
        </div>

        <button
          className="power-btn"
          title="Lock PC"
          onClick={() => {
            soundManager.playClick();
            onLock();
            onCloseStart();
          }}
        >
          <Power size={18} />
        </button>
      </div>
    </div>
  );
}
