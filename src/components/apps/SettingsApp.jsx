import React, { useState } from 'react';
import { Palette, Volume2, Layout, Monitor } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import './SettingsApp.css';

export default function SettingsApp({
  wallpapers,
  currentWallpaper,
  onSelectWallpaper,
  theme,
  onToggleTheme,
  taskbarAlign,
  onToggleTaskbarAlign
}) {
  const [tab, setTab] = useState('personalization');
  const [soundEnabled, setSoundEnabled] = useState(soundManager.enabled);

  const toggleSound = () => {
    soundManager.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      soundManager.playClick();
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <button
          className={`settings-nav-btn ${tab === 'personalization' ? 'active' : ''}`}
          onClick={() => setTab('personalization')}
        >
          <Palette size={16} /> Personalization
        </button>
        <button
          className={`settings-nav-btn ${tab === 'sound' ? 'active' : ''}`}
          onClick={() => setTab('sound')}
        >
          <Volume2 size={16} /> Sound & Audio
        </button>
        <button
          className={`settings-nav-btn ${tab === 'taskbar' ? 'active' : ''}`}
          onClick={() => setTab('taskbar')}
        >
          <Layout size={16} /> Taskbar & Dock
        </button>
      </div>

      <div className="settings-content">
        {tab === 'personalization' && (
          <div>
            <h3 className="settings-section-title">Background & Theme</h3>
            <p className="settings-section-desc">Select a signature Windows 11 wallpaper and toggle system appearance.</p>

            <div className="wallpaper-grid">
              {wallpapers.map((wp) => (
                <div
                  key={wp.id}
                  className={`wallpaper-card ${currentWallpaper.id === wp.id ? 'active' : ''}`}
                  onClick={() => {
                    soundManager.playClick();
                    onSelectWallpaper(wp);
                  }}
                >
                  <div className="wallpaper-preview" style={{ background: wp.css }} />
                  <span className="wallpaper-name">{wp.name}</span>
                </div>
              ))}
            </div>

            <div className="settings-toggle-row">
              <div className="toggle-info">
                <h4>Dark Mode Appearance</h4>
                <p>Toggle between Windows 11 Dark Mode and Light Mode</p>
              </div>
              <div
                className={`toggle-switch ${theme === 'dark' ? 'checked' : ''}`}
                onClick={onToggleTheme}
              >
                <div className="toggle-circle" />
              </div>
            </div>
          </div>
        )}

        {tab === 'sound' && (
          <div>
            <h3 className="settings-section-title">System Sound Effects</h3>
            <p className="settings-section-desc">Enable synthetic audio feedback when opening windows, clicking buttons, and unlocking.</p>

            <div className="settings-toggle-row">
              <div className="toggle-info">
                <h4>Tactile Audio Feedback</h4>
                <p>Play click, unlock, and window sounds synthesized via Web Audio API</p>
              </div>
              <div
                className={`toggle-switch ${soundEnabled ? 'checked' : ''}`}
                onClick={toggleSound}
              >
                <div className="toggle-circle" />
              </div>
            </div>
          </div>
        )}

        {tab === 'taskbar' && (
          <div>
            <h3 className="settings-section-title">Taskbar Behaviors</h3>
            <p className="settings-section-desc">Customize how taskbar items and the start button are positioned.</p>

            <div className="settings-toggle-row">
              <div className="toggle-info">
                <h4>Center Taskbar Alignment</h4>
                <p>Align Windows 11 icons in the center (disable for Windows 10 left alignment)</p>
              </div>
              <div
                className={`toggle-switch ${taskbarAlign === 'center' ? 'checked' : ''}`}
                onClick={onToggleTaskbarAlign}
              >
                <div className="toggle-circle" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
