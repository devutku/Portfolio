import React, { useState } from 'react';
import { Trash2, File, RefreshCw } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

export default function RecycleBinApp({ initialItems }) {
  const [items, setItems] = useState(initialItems);

  const handleEmpty = () => {
    soundManager.playClose();
    setItems([]);
  };

  const handleRestore = () => {
    soundManager.playOpen();
    setItems(initialItems);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'rgba(15,23,42,0.5)', color: 'var(--text-primary)' }}>
      <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border-acrylic)', display: 'flex', gap: '10px', background: 'rgba(255,255,255,0.02)' }}>
        <button
          onClick={handleEmpty}
          disabled={items.length === 0}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            borderRadius: 6,
            background: items.length === 0 ? 'transparent' : 'var(--win-close-hover)',
            color: items.length === 0 ? 'var(--text-muted)' : '#ffffff',
            fontSize: 12,
            fontWeight: 500,
            cursor: items.length === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          <Trash2 size={14} /> Empty Recycle Bin
        </button>
        {items.length === 0 && (
          <button
            onClick={handleRestore}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              borderRadius: 6,
              background: 'var(--win-blue)',
              color: '#ffffff',
              fontSize: 12,
              fontWeight: 500
            }}
          >
            <RefreshCw size={14} /> Restore Deleted Items
          </button>
        )}
      </div>

      <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: 60, color: 'var(--text-muted)' }}>
            <Trash2 size={48} style={{ margin: '0 auto 12px auto', opacity: 0.4 }} />
            <p>This folder is completely empty.</p>
            <p style={{ fontSize: 12, marginTop: 4 }}>All bugs and 94GB node_modules have been banished!</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-acrylic)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                <th style={{ padding: '8px 12px' }}>Name</th>
                <th style={{ padding: '8px 12px' }}>Original Item Type</th>
                <th style={{ padding: '8px 12px' }}>Size</th>
                <th style={{ padding: '8px 12px' }}>Date Deleted</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <File size={15} color="var(--win-accent)" />
                    {item.name}
                  </td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{item.type}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{item.size}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
