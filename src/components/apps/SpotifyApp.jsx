import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';
import './SpotifyApp.css';

export default function SpotifyApp({ playlist }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const currentTrack = playlist[currentIdx] || playlist[0];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentIdx, volume, isMuted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentIdx((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentIdx((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  return (
    <div className="spotify-container">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onEnded={nextTrack}
        crossOrigin="anonymous"
      />

      <div className="spotify-main">
        <div className="spotify-playlist">
          <h3>Coding & Focus Sessions</h3>
          {playlist.map((track, idx) => (
            <div
              key={idx}
              className={`track-item ${idx === currentIdx ? 'active' : ''}`}
              onClick={() => {
                setCurrentIdx(idx);
                setIsPlaying(true);
              }}
            >
              <img src={track.cover} alt={track.title} className="track-thumb" />
              <div className="track-info">
                <div className="track-title">{track.title}</div>
                <div className="track-artist">{track.artist}</div>
              </div>
              {idx === currentIdx && isPlaying && (
                <div className="equalizer-wave">
                  <div className="eq-bar" />
                  <div className="eq-bar" />
                  <div className="eq-bar" />
                  <div className="eq-bar" />
                </div>
              )}
              <div className="track-duration">{track.duration}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom player controls */}
      <div className="spotify-player-bar">
        <div className="current-track-info">
          <img src={currentTrack.cover} alt={currentTrack.title} className="current-thumb" />
          <div className="current-text">
            <h5>{currentTrack.title}</h5>
            <p>{currentTrack.artist}</p>
          </div>
        </div>

        <div className="player-controls">
          <div className="control-buttons">
            <button className="ctrl-btn" onClick={prevTrack} title="Previous">
              <SkipBack size={18} />
            </button>
            <button className="play-pause-btn" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
            </button>
            <button className="ctrl-btn" onClick={nextTrack} title="Next">
              <SkipForward size={18} />
            </button>
          </div>
        </div>

        <div className="volume-control">
          <button className="ctrl-btn" onClick={() => setIsMuted(!isMuted)}>
            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              setIsMuted(false);
            }}
            className="volume-slider"
          />
        </div>
      </div>
    </div>
  );
}
