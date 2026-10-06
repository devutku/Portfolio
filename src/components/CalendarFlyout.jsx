import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarFlyout({ onClose }) {
  const [currentDate] = useState(new Date());

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const dayNum = currentDate.getDate();

  // Simple calendar grid for current month
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} style={{ opacity: 0.2 }}></div>);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === dayNum;
    cells.push(
      <div
        key={`day-${d}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 32,
          borderRadius: '50%',
          fontSize: 12,
          fontWeight: isToday ? 700 : 400,
          background: isToday ? 'var(--win-blue)' : 'transparent',
          color: isToday ? '#ffffff' : 'var(--text-primary)',
          cursor: 'pointer'
        }}
      >
        {d}
      </div>
    );
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'absolute',
        bottom: 'calc(var(--taskbar-height) + 10px)',
        right: 12,
        width: 320,
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
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 24, fontWeight: 600 }}>
          {currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
        </div>
        <div style={{ fontSize: 13, color: 'var(--win-accent)', marginTop: 2 }}>
          {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border-acrylic)', paddingTop: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>{monthName}</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button style={{ padding: 4, color: 'var(--text-secondary)' }}><ChevronLeft size={16} /></button>
            <button style={{ padding: 4, color: 'var(--text-secondary)' }}><ChevronRight size={16} /></button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', gap: 4, marginBottom: 8, fontSize: 11, color: 'var(--text-muted)' }}>
          {daysOfWeek.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
          {cells}
        </div>
      </div>
    </div>
  );
}
