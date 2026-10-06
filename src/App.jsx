import React, { useState, useEffect } from 'react';
import { User, Folder, Code2, Terminal, Music, Mail, Settings, Trash2 } from 'lucide-react';
import { portfolioData } from './data/portfolioData';
import LockScreen from './components/LockScreen';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import QuickSettings from './components/QuickSettings';
import CalendarFlyout from './components/CalendarFlyout';
import WindowFrame from './components/WindowFrame';

// Apps
import AboutApp from './components/apps/AboutApp';
import ProjectsApp from './components/apps/ProjectsApp';
import SkillsApp from './components/apps/SkillsApp';
import TerminalApp from './components/apps/TerminalApp';
import SpotifyApp from './components/apps/SpotifyApp';
import ContactApp from './components/apps/ContactApp';
import SettingsApp from './components/apps/SettingsApp';
import RecycleBinApp from './components/apps/RecycleBinApp';

import { soundManager } from './utils/soundEffects';

export default function App() {
  const [user, setUser] = useState(portfolioData.user);
  const [isLocked, setIsLocked] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [wallpaper, setWallpaper] = useState(portfolioData.wallpapers[0]);
  const [taskbarAlign, setTaskbarAlign] = useState('center');

  // Menus & Flyouts
  const [startOpen, setStartOpen] = useState(false);
  const [quickSettingsOpen, setQuickSettingsOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Window System State
  const [highestZ, setHighestZ] = useState(100);
  const [activeWinId, setActiveWinId] = useState(null);

  const initialWindows = [
    {
      id: 'about',
      title: 'About Me - Personal Profile',
      icon: User,
      isOpen: false,
      isMinimized: false,
      zIndex: 10,
      defaultPos: { x: 120, y: 50 },
      defaultSize: { width: 750, height: 520 }
    },
    {
      id: 'projects',
      title: 'Projects Explorer',
      icon: Folder,
      isOpen: false,
      isMinimized: false,
      zIndex: 11,
      defaultPos: { x: 160, y: 70 },
      defaultSize: { width: 840, height: 560 }
    },
    {
      id: 'skills',
      title: 'Tech Stack & Proficiencies',
      icon: Code2,
      isOpen: false,
      isMinimized: false,
      zIndex: 12,
      defaultPos: { x: 140, y: 60 },
      defaultSize: { width: 780, height: 520 }
    },
    {
      id: 'terminal',
      title: 'Windows PowerShell',
      icon: Terminal,
      isOpen: false,
      isMinimized: false,
      zIndex: 13,
      defaultPos: { x: 200, y: 90 },
      defaultSize: { width: 680, height: 440 }
    },
    {
      id: 'spotify',
      title: 'Spotify - Coding Beats',
      icon: Music,
      isOpen: false,
      isMinimized: false,
      zIndex: 14,
      defaultPos: { x: 240, y: 110 },
      defaultSize: { width: 620, height: 420 }
    },
    {
      id: 'contact',
      title: 'Outlook Mail - Contact',
      icon: Mail,
      isOpen: false,
      isMinimized: false,
      zIndex: 15,
      defaultPos: { x: 180, y: 80 },
      defaultSize: { width: 720, height: 500 }
    },
    {
      id: 'settings',
      title: 'Windows Settings',
      icon: Settings,
      isOpen: false,
      isMinimized: false,
      zIndex: 16,
      defaultPos: { x: 220, y: 100 },
      defaultSize: { width: 700, height: 480 }
    },
    {
      id: 'recycle',
      title: 'Recycle Bin',
      icon: Trash2,
      isOpen: false,
      isMinimized: false,
      zIndex: 17,
      defaultPos: { x: 160, y: 90 },
      defaultSize: { width: 640, height: 400 }
    }
  ];

  const [windows, setWindows] = useState(initialWindows);

  // Sync theme attribute to HTML root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Window Focus
  const focusWindow = (id) => {
    setHighestZ((prev) => {
      const nextZ = prev + 1;
      setWindows((wins) =>
        wins.map((w) => (w.id === id ? { ...w, zIndex: nextZ, isMinimized: false } : w))
      );
      return nextZ;
    });
    setActiveWinId(id);
  };

  // Open App
  const openApp = (id) => {
    soundManager.playOpen();
    setWindows((wins) =>
      wins.map((w) => {
        if (w.id === id) {
          return { ...w, isOpen: true, isMinimized: false };
        }
        return w;
      })
    );
    focusWindow(id);
  };

  // Close App
  const closeApp = (id) => {
    setWindows((wins) =>
      wins.map((w) => (w.id === id ? { ...w, isOpen: false } : w))
    );
    if (activeWinId === id) setActiveWinId(null);
  };

  // Minimize App
  const minimizeApp = (id) => {
    setWindows((wins) =>
      wins.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    if (activeWinId === id) setActiveWinId(null);
  };

  // Taskbar Click for App
  const handleTaskbarAppClick = (id) => {
    const targetWin = windows.find((w) => w.id === id);
    if (!targetWin) return;

    if (!targetWin.isOpen) {
      openApp(id);
    } else if (targetWin.isMinimized) {
      focusWindow(id);
    } else if (activeWinId === id) {
      minimizeApp(id);
    } else {
      focusWindow(id);
    }
  };

  // Minimize All (Show Desktop)
  const handleMinimizeAll = () => {
    const anyOpenNotMinimized = windows.some((w) => w.isOpen && !w.isMinimized);
    setWindows((wins) =>
      wins.map((w) => {
        if (w.isOpen) {
          return { ...w, isMinimized: anyOpenNotMinimized };
        }
        return w;
      })
    );
  };

  const handleCloseAllPopups = () => {
    setStartOpen(false);
    setQuickSettingsOpen(false);
    setCalendarOpen(false);
  };

  const handleUnlock = (updatedProfile) => {
    if (updatedProfile) {
      setUser((prev) => ({
        ...prev,
        fullName: updatedProfile.name || prev.fullName,
        avatar: updatedProfile.avatar || prev.avatar
      }));
    }
    setIsLocked(false);
    // Automatically open About Me after initial unlock for great onboarding!
    setTimeout(() => {
      openApp('about');
    }, 450);
  };

  const handleLock = () => {
    handleCloseAllPopups();
    setIsLocked(true);
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: wallpaper.css
      }}
    >
      {/* Lock Screen */}
      <LockScreen
        user={user}
        wallpaper={wallpaper}
        isLocked={isLocked}
        onUnlock={handleUnlock}
      />

      {/* Desktop Workspace */}
      <Desktop
        wallpaper={wallpaper}
        user={user}
        onOpenApp={openApp}
        onDesktopClick={handleCloseAllPopups}
      />

      {/* Active Windows */}
      {windows.map((win) => {
        return (
          <WindowFrame
            key={win.id}
            id={win.id}
            title={win.title}
            icon={win.icon}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            zIndex={win.zIndex}
            defaultPos={win.defaultPos}
            defaultSize={win.defaultSize}
            onClose={closeApp}
            onMinimize={minimizeApp}
            onFocus={focusWindow}
          >
            {win.id === 'about' && (
              <AboutApp
                user={user}
                about={portfolioData.about}
                onOpenContact={() => openApp('contact')}
              />
            )}
            {win.id === 'projects' && (
              <ProjectsApp projects={portfolioData.projects} />
            )}
            {win.id === 'skills' && (
              <SkillsApp skills={portfolioData.skills} />
            )}
            {win.id === 'terminal' && (
              <TerminalApp
                user={user}
                skills={portfolioData.skills}
                projects={portfolioData.projects}
                onClose={() => closeApp('terminal')}
                onSetTheme={setTheme}
              />
            )}
            {win.id === 'spotify' && (
              <SpotifyApp playlist={portfolioData.musicPlaylist} />
            )}
            {win.id === 'contact' && (
              <ContactApp user={user} />
            )}
            {win.id === 'settings' && (
              <SettingsApp
                wallpapers={portfolioData.wallpapers}
                currentWallpaper={wallpaper}
                onSelectWallpaper={setWallpaper}
                theme={theme}
                onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                taskbarAlign={taskbarAlign}
                onToggleTaskbarAlign={() =>
                  setTaskbarAlign(taskbarAlign === 'center' ? 'left' : 'center')
                }
              />
            )}
            {win.id === 'recycle' && (
              <RecycleBinApp initialItems={portfolioData.recycleBinItems} />
            )}
          </WindowFrame>
        );
      })}

      {/* Start Menu */}
      {startOpen && (
        <StartMenu
          user={user}
          taskbarAlign={taskbarAlign}
          onOpenApp={openApp}
          onLock={handleLock}
          onCloseStart={() => setStartOpen(false)}
        />
      )}

      {/* Quick Settings flyout */}
      {quickSettingsOpen && (
        <QuickSettings
          theme={theme}
          onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          onClose={() => setQuickSettingsOpen(false)}
        />
      )}

      {/* Calendar flyout */}
      {calendarOpen && (
        <CalendarFlyout onClose={() => setCalendarOpen(false)} />
      )}

      {/* Taskbar */}
      <Taskbar
        openWindows={windows}
        activeWinId={activeWinId}
        startOpen={startOpen}
        quickSettingsOpen={quickSettingsOpen}
        calendarOpen={calendarOpen}
        taskbarAlign={taskbarAlign}
        onToggleStart={() => {
          setStartOpen(!startOpen);
          setQuickSettingsOpen(false);
          setCalendarOpen(false);
        }}
        onToggleQuickSettings={() => {
          setQuickSettingsOpen(!quickSettingsOpen);
          setStartOpen(false);
          setCalendarOpen(false);
        }}
        onToggleCalendar={() => {
          setCalendarOpen(!calendarOpen);
          setStartOpen(false);
          setQuickSettingsOpen(false);
        }}
        onAppClick={handleTaskbarAppClick}
        onMinimizeAll={handleMinimizeAll}
      />
    </div>
  );
}
