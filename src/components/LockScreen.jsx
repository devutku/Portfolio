import React, { useState, useEffect } from 'react';
import { ArrowRight, Wifi, BatteryMedium, Power, MapPin, Globe } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import './LockScreen.css';

export default function LockScreen({ user, wallpaper, isLocked, onUnlock }) {
  const [time, setTime] = useState(new Date());
  const [inputVal, setInputVal] = useState('');
  const [avatar, setAvatar] = useState(user.avatar);
  const [displayName, setDisplayName] = useState(user.fullName || user.name);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSignIn = async (e) => {
    if (e) e.preventDefault();
    soundManager.playUnlock();

    if (inputVal.trim()) {
      setLoading(true);
      try {
        const res = await fetch(`https://api.github.com/users/${inputVal.trim()}`);
        if (res.ok) {
          const data = await res.json();
          if (data.avatar_url) setAvatar(data.avatar_url);
          if (data.name) setDisplayName(data.name);
        }
      } catch (err) {
        console.warn('GitHub fetch skipped:', err);
      } finally {
        setLoading(false);
      }
    }

    setTimeout(() => {
      onUnlock({
        name: displayName,
        avatar: avatar
      });
    }, 150);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLocked && e.key === 'Enter') {
        handleSignIn();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLocked, inputVal, displayName, avatar]);

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const formattedDate = time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className={`lockscreen-container ${!isLocked ? 'unlocked' : ''}`}>
      <div 
        className="lockscreen-bg" 
        style={{ background: wallpaper.css }}
      />

      {/* Top Bar */}
      <div className="lockscreen-top">
        <div className="location-tag">
          <MapPin size={15} />
          <span>{user.location || "Tokyo, Japan"}</span>
        </div>
        <div className="system-status-icons">
          <Wifi size={18} title="Connected to Wi-Fi" />
          <BatteryMedium size={20} title="Battery 85%" />
          <Power size={18} title="System Online" onClick={handleSignIn} />
        </div>
      </div>

      {/* Center User Card */}
      <div className="lockscreen-center">
        <div className="lock-time-display">{formattedTime}</div>
        <div className="lock-date-display">{formattedDate}</div>

        <div className="user-card">
          <div className="avatar-wrapper">
            <img 
              src={avatar} 
              alt={displayName} 
              className="avatar-img"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80";
              }}
            />
          </div>

          <h1 className="user-name">{displayName}</h1>
          <p className="user-account-label">GitHub profile • {user.role || "Software Engineer"}</p>

          <form className="login-form" onSubmit={handleSignIn}>
            <div className="input-group">
              <input
                id="github-name-input"
                type="text"
                autoFocus
                placeholder="Enter GitHub username (or press Enter)"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
              />
              <button 
                type="submit" 
                className="submit-btn" 
                aria-label="Continue"
                title="Sign in"
                disabled={loading}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="bottom-hint" onClick={handleSignIn}>
        <span>Press Enter or click to sign in</span>
      </div>
    </div>
  );
}
