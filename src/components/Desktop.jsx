import React, { useState } from 'react';
import { User, Folder, Code2, Terminal, Music, Mail, Settings, Trash2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './common/BrandIcons';
import WeatherWidget from './widgets/WeatherWidget';
import LikeCounterWidget from './widgets/LikeCounterWidget';
import { soundManager } from '../utils/soundEffects';
import './Desktop.css';

export default function Desktop({
  wallpaper,
  user,
  onOpenApp,
  onDesktopClick
}) {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const desktopIcons = [
    { id: 'about', label: 'About Me', icon: User, color: '#38bdf8' },
    { id: 'projects', label: 'Projects', icon: Folder, color: '#f59e0b' },
    { id: 'skills', label: 'Tech Stack', icon: Code2, color: '#10b981' },
    { id: 'terminal', label: 'PowerShell', icon: Terminal, color: '#6366f1' },
    { id: 'spotify', label: 'Spotify', icon: Music, color: '#22c55e' },
    { id: 'contact', label: 'Outlook Mail', icon: Mail, color: '#0ea5e9' },
    { id: 'settings', label: 'Settings', icon: Settings, color: '#8b5cf6' },
    { id: 'recycle', label: 'Recycle Bin', icon: Trash2, color: '#ec4899' },
    { id: 'github_link', label: 'GitHub', icon: GithubIcon, color: '#f8fafc', isExternal: true, url: user.links.github },
    { id: 'linkedin_link', label: 'LinkedIn', icon: LinkedinIcon, color: '#0077b5', isExternal: true, url: user.links.linkedin }
  ];

  const handleIconClick = (e, icon) => {
    e.stopPropagation();
    setSelectedIcon(icon.id);
    soundManager.playClick();
    if (icon.isExternal && icon.url) {
      window.open(icon.url, '_blank');
    } else {
      onOpenApp(icon.id);
    }
  };

  return (
    <div
      className="desktop-content"
      onClick={() => {
        setSelectedIcon(null);
        onDesktopClick();
      }}
    >
      {/* Desktop Icons column */}
      <div className="desktop-icons-grid">
        {desktopIcons.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`desktop-icon-item ${selectedIcon === item.id ? 'selected' : ''}`}
              onClick={(e) => handleIconClick(e, item)}
              onDoubleClick={(e) => handleIconClick(e, item)}
            >
              <div
                className="desktop-icon-graphic"
                style={{
                  background: `${item.color}25`,
                  border: `1px solid ${item.color}50`
                }}
              >
                <Icon size={24} color={item.color} />
              </div>
              <span className="desktop-icon-title">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Right Desktop Widgets */}
      <div className="desktop-widgets-column" onClick={(e) => e.stopPropagation()}>
        <WeatherWidget location={user.location.split(',')[0]} />
        <LikeCounterWidget />
      </div>
    </div>
  );
}
