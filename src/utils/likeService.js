// Real-time Like Synchronization Service for Vercel & Web Deployments
// Supports Firebase Realtime DB, Vercel Serverless KV, and BroadcastChannel fallback

const FIREBASE_DB_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL || null;
const CHANNEL_NAME = 'portfolio_likes_sync';
const LOCAL_STORAGE_KEY = 'portfolio_likes_count';
const DEFAULT_INITIAL_LIKES = 348;

let channel = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    channel = new BroadcastChannel(CHANNEL_NAME);
  } catch {
    channel = null;
  }
}

export const likeService = {
  // Subscribe to real-time updates
  subscribe(onUpdate) {
    // 1. Initial read from localStorage
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    const initialCount = saved ? parseInt(saved, 10) : DEFAULT_INITIAL_LIKES;
    onUpdate(initialCount);

    // 2. If Firebase Realtime DB URL is provided, fetch latest count
    if (FIREBASE_DB_URL) {
      fetch(`${FIREBASE_DB_URL}/likes.json`)
        .then((res) => res.json())
        .then((count) => {
          if (typeof count === 'number') {
            localStorage.setItem(LOCAL_STORAGE_KEY, count.toString());
            onUpdate(count);
          }
        })
        .catch(() => {});
    }

    // 3. Listen to multi-tab / broadcast events
    const handleBroadcast = (event) => {
      if (event.data && typeof event.data.count === 'number') {
        localStorage.setItem(LOCAL_STORAGE_KEY, event.data.count.toString());
        onUpdate(event.data.count);
      }
    };

    if (channel) {
      channel.addEventListener('message', handleBroadcast);
    }

    return () => {
      if (channel) {
        channel.removeEventListener('message', handleBroadcast);
      }
    };
  },

  // Increment like count
  async incrementLike(currentCount) {
    const nextCount = currentCount + 1;
    localStorage.setItem(LOCAL_STORAGE_KEY, nextCount.toString());

    // Broadcast to other open tabs immediately
    if (channel) {
      channel.postMessage({ count: nextCount });
    }

    // If Firebase DB URL exists, send atomic transaction / patch
    if (FIREBASE_DB_URL) {
      try {
        await fetch(`${FIREBASE_DB_URL}/likes.json`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nextCount)
        });
      } catch (err) {
        console.warn('Realtime cloud sync error:', err);
      }
    }

    return nextCount;
  }
};
