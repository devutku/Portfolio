import React, { useState, useRef, useEffect } from 'react';
import { Minus, Square, Copy, X } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import './WindowFrame.css';

export default function WindowFrame({
  id,
  title,
  icon: Icon,
  isOpen,
  isMinimized,
  zIndex,
  defaultPos = { x: 100, y: 60 },
  defaultSize = { width: 720, height: 480 },
  onClose,
  onMinimize,
  onFocus,
  children
}) {
  const [pos, setPos] = useState(defaultPos);
  const [size, setSize] = useState(defaultSize);
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaxState, setPreMaxState] = useState(null);

  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDownHeader = (e) => {
    if (isMaximized) return;
    onFocus(id);
    soundManager.playClick();
    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y
    };

    const handleMouseMove = (moveEvent) => {
      if (!isDragging.current) return;
      const nextX = Math.max(10, Math.min(window.innerWidth - size.width - 10, moveEvent.clientX - dragOffset.current.x));
      const nextY = Math.max(10, Math.min(window.innerHeight - 80, moveEvent.clientY - dragOffset.current.y));
      setPos({ x: nextX, y: nextY });
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const toggleMaximize = () => {
    soundManager.playClick();
    if (!isMaximized) {
      setPreMaxState({ pos, size });
      setIsMaximized(true);
    } else {
      if (preMaxState) {
        setPos(preMaxState.pos);
        setSize(preMaxState.size);
      }
      setIsMaximized(false);
    }
  };

  if (!isOpen) return null;

  const style = isMaximized
    ? {
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - var(--taskbar-height))',
        borderRadius: 0,
        zIndex
      }
    : {
        top: `${pos.y}px`,
        left: `${pos.x}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex
      };

  return (
    <div
      className={`window-frame ${isMinimized ? 'minimized' : ''} active-win`}
      style={style}
      onMouseDown={() => onFocus(id)}
    >
      <div 
        className="window-header"
        onMouseDown={handleMouseDownHeader}
        onDoubleClick={toggleMaximize}
      >
        <div className="window-title-group">
          {Icon && <span className="window-icon"><Icon size={16} /></span>}
          <span>{title}</span>
        </div>
        <div className="window-controls">
          <button 
            className="win-control-btn" 
            title="Minimize" 
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playClick();
              onMinimize(id);
            }}
          >
            <Minus size={13} />
          </button>
          <button 
            className="win-control-btn" 
            title={isMaximized ? "Restore" : "Maximize"} 
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximize();
            }}
          >
            {isMaximized ? <Copy size={12} /> : <Square size={12} />}
          </button>
          <button 
            className="win-control-btn close-btn" 
            title="Close" 
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playClose();
              onClose(id);
            }}
          >
            <X size={15} />
          </button>
        </div>
      </div>
      <div className="window-body">
        {children}
      </div>
    </div>
  );
}
