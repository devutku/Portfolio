import React, { useState } from 'react';
import { Wifi, Bluetooth, Moon, Sun, Plane, BatteryCharging, Volume2, SunMedium } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export default function QuickSettings({ theme, onToggleTheme, onClose }) {
  const [wifi, setWifi] = useState(true);
  const [bt, setBt] = useState(true);
  const [nightLight, setNightLight] = useState(false);
  const [volume, setVolume] = useState(75);
  const [brightness, setBrightness] = useState(90);

  const toggle = (setter, val) => {
    soundManager.playClick();
    setter(!val);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'absolute',
        bottom: 'calc(var(--taskbar-height) + 10px)',
        right: 12,
        width: 340,
        background: 'var(--bg-acrylic-heavy)',
        backdropFilter: 'blur(36px) saturate(190%)',
        WebkitBackdropFilter: 'blur(36px) saturate(190%)',
        border: '1px solid var(--border-acrylic)',
        borderRadius: 'var(--border-radius-win)',
        boxShadow: 'var(--win-shadow)',
        zIndex: 9991,
        padding: 20,
        color: 'var(--text-primary)',
        animation: 'slideUpFade 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 18 }}>
        {/* WiFi */}
        <div
          onClick={() => toggle(setWifi, wifi)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            padding: '12px 8px',
            borderRadius: 8,
            background: wifi ? 'var(--win-blue)' : 'var(--bg-surface)',
            color: wifi ? '#ffffff' : 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <Wifi size={18} />
          <span style={{ fontSize: 11, fontWeight: 500 }}>Wi-Fi</span>
        </div>

        {/* Bluetooth */}
        <div
          onClick={() => toggle(setBt, bt)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            padding: '12px 8px',
            borderRadius: 8,
            background: bt ? 'var(--win-blue)' : 'var(--bg-surface)',
            color: bt ? '#ffffff' : 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <Bluetooth size={18} />
          <span style={{ fontSize: 11, fontWeight: 500 }}>Bluetooth</span>
        </div>

        {/* Dark Mode */}
        <div
          onClick={() => {
            soundManager.playClick();
            onToggleTheme();
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            padding: '12px 8px',
            borderRadius: 8,
            background: theme === 'dark' ? 'var(--win-blue)' : 'var(--bg-surface)',
            color: theme === 'dark' ? '#ffffff' : 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
          <span style={{ fontSize: 11, fontWeight: 500 }}>Dark mode</span>
        </div>
      </div>

      {/* Sliders */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Brightness */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <SunMedium size={18} color="var(--text-muted)" />
          <input
            type="range"
            min="10"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
            style={{ flex: 1, accentColor: 'var(--win-accent)' }}
          />
        </div>

        {/* Volume */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Volume2 size={18} color="var(--text-muted)" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            style={{ flex: 1, accentColor: 'var(--win-accent)' }}
          />
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border-acrylic)', marginTop: 16, paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: 'var(--text-secondary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <BatteryCharging size={16} color="#4ade80" />
          <span>Battery 88% (Charging)</span>
        </div>
      </div>
    </div>
  );
}
