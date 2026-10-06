import React, { useState, useEffect } from 'react';
import { Wifi, Volume2, BatteryMedium, ChevronUp, User, Folder, Code2, Terminal, Music, Mail, Settings, Trash2 } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import './Taskbar.css';

// Official Windows 11 4-Square SVG
function Windows11Logo({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="9.5" height="9.5" rx="1" fill="#0078D4" />
      <rect x="12.5" y="2" width="9.5" height="9.5" rx="1" fill="#0078D4" />
      <rect x="2" y="12.5" width="9.5" height="9.5" rx="1" fill="#0078D4" />
      <rect x="12.5" y="12.5" width="9.5" height="9.5" rx="1" fill="#0078D4" />
    </svg>
  );
}

export default function Taskbar({
  openWindows,
  activeWinId,
  startOpen,
  quickSettingsOpen,
  calendarOpen,
  taskbarAlign,
  onToggleStart,
  onToggleQuickSettings,
  onToggleCalendar,
  onAppClick,
  onMinimizeAll
}) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pinned = [
    { id: 'about', title: 'About Me', icon: User, color: '#38bdf8' },
    { id: 'projects', title: 'Projects', icon: Folder, color: '#f59e0b' },
    { id: 'skills', title: 'Skills', icon: Code2, color: '#10b981' },
    { id: 'terminal', title: 'Terminal', icon: Terminal, color: '#6366f1' },
    { id: 'spotify', title: 'Spotify', icon: Music, color: '#22c55e' },
    { id: 'contact', title: 'Mail', icon: Mail, color: '#0ea5e9' },
    { id: 'settings', title: 'Settings', icon: Settings, color: '#8b5cf6' },
  ];

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const formattedDate = time.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });

  return (
    <div className={`taskbar-container ${taskbarAlign === 'left' ? 'align-left' : ''}`}>
      {/* Center Section: Start + Pinned/Open apps */}
      <div className="taskbar-center-section">
        {/* Start Button */}
        <button
          className={`taskbar-icon-btn windows-logo-btn ${startOpen ? 'active-app' : ''}`}
          title="Start"
          onClick={() => {
            soundManager.playClick();
            onToggleStart();
          }}
        >
          <Windows11Logo size={20} />
        </button>

        {/* Pinned / Open Apps */}
        {pinned.map((item) => {
          const isOpen = openWindows.some((w) => w.id === item.id && w.isOpen);
          const isFocused = activeWinId === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={`taskbar-icon-btn ${isFocused ? 'active-app' : ''}`}
              title={item.title}
              onClick={() => {
                soundManager.playClick();
                onAppClick(item.id);
              }}
            >
              <Icon size={20} color={item.color} />
              {isOpen && <span className="running-dot" />}
            </button>
          );
        })}
      </div>

      {/* Right Section: System Tray */}
      <div className="taskbar-tray-right">
        <div className="tray-pill" style={{ padding: '4px 6px' }} title="Show hidden icons">
          <ChevronUp size={16} />
        </div>

        <div className="tray-pill" style={{ padding: '4px 6px', fontSize: 11, fontWeight: 600 }}>
          ENG
        </div>

        {/* Quick Settings pill: Wifi + Sound + Battery */}
        <div
          className={`tray-pill ${quickSettingsOpen ? 'active-app' : ''}`}
          onClick={() => {
            soundManager.playClick();
            onToggleQuickSettings();
          }}
          title="Network, Volume, Battery"
        >
          <Wifi size={16} />
          <Volume2 size={16} />
          <BatteryMedium size={18} />
        </div>

        {/* Clock & Date pill */}
        <div
          className={`tray-pill ${calendarOpen ? 'active-app' : ''}`}
          onClick={() => {
            soundManager.playClick();
            onToggleCalendar();
          }}
          title="Date & Time"
        >
          <div className="tray-clock">
            <span>{formattedTime}</span>
            <span style={{ color: 'var(--text-secondary)' }}>{formattedDate}</span>
          </div>
        </div>

        {/* Show Desktop Peek */}
        <div
          className="show-desktop-peek"
          title="Show Desktop"
          onClick={() => {
            soundManager.playClick();
            onMinimizeAll();
          }}
        />
      </div>
    </div>
  );
}
