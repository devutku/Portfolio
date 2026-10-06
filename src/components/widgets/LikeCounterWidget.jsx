import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/soundEffects';
import { likeService } from '../../utils/likeService';

export default function LikeCounterWidget() {
  const [likes, setLikes] = useState(348);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const unsubscribe = likeService.subscribe((count) => {
      setLikes(count);
    });
    return () => unsubscribe();
  }, []);

  const handleLike = async (e) => {
    soundManager.playClick();
    setLiked(true);

    // Optimistic UI update and real-time broadcast
    const nextCount = await likeService.incrementLike(likes);
    setLikes(nextCount);

    // Trigger confetti from the button's position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 35,
      spread: 45,
      origin: { x, y },
      colors: ['#f43f5e', '#ec4899', '#38bdf8', '#fbbf24']
    });

    setTimeout(() => setLiked(false), 500);
  };

  return (
    <div
      style={{
        background: 'var(--bg-acrylic)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid var(--border-acrylic)',
        borderRadius: 'var(--border-radius-win)',
        padding: '12px 16px',
        boxShadow: 'var(--win-shadow-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '220px',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        transition: 'transform 0.15s ease'
      }}
      onClick={handleLike}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(244, 63, 94, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: liked ? 'scale(1.3)' : 'scale(1)',
            transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          <Heart size={18} fill="#f43f5e" color="#f43f5e" />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Like Portfolio</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Click to send love</div>
        </div>
      </div>

      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--win-accent)' }}>
        {likes}
      </div>
    </div>
  );
}
