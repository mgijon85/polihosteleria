import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  duration?: string; // e.g. "0:18"
  label?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ duration = '0:18', label }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Parse duration seconds
  const parts = duration.split(':');
  const totalSeconds = (parseInt(parts[0], 10) || 0) * 60 + (parseInt(parts[1], 10) || 18);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return p + (100 / totalSeconds) * 0.2;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalSeconds]);

  const currentSeconds = Math.floor((progress / 100) * totalSeconds);
  const currentStr = `0:${String(currentSeconds).padStart(2, '0')}`;

  const togglePlay = () => {
    if (progress >= 100) setProgress(0);
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center gap-3 bg-[var(--surface-2)] p-2.5 rounded-card border border-[var(--line)]">
      <button
        type="button"
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center flex-shrink-0 hover:opacity-90 active:scale-95 transition-all shadow-sm"
        aria-label={isPlaying ? 'Pausar audio' : 'Reproducir audio'}
      >
        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
      </button>

      <div className="flex-1 min-w-0">
        {label && <div className="text-[11px] font-medium text-[var(--muted)] mb-1 truncate">{label}</div>}
        
        {/* Waveform / Progress bar */}
        <div 
          className="relative h-6 flex items-center gap-[2px] cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            setProgress(Math.min(100, Math.max(0, clickPos * 100)));
          }}
        >
          {/* Waveform fake bars */}
          {[40, 70, 30, 85, 60, 45, 90, 75, 40, 60, 95, 80, 50, 70, 40, 85, 65, 30, 75, 90, 60, 40, 70, 80].map((h, i) => {
            const barPos = (i / 24) * 100;
            const isFilled = barPos <= progress;
            return (
              <span
                key={i}
                className={`flex-1 rounded-full transition-colors ${
                  isFilled ? 'bg-brand' : 'bg-[var(--line)]'
                }`}
                style={{ height: `${h}%` }}
              />
            );
          })}
        </div>

        <div className="flex justify-between items-center text-[11px] text-[var(--muted)] tabular-nums mt-0.5">
          <span>{isPlaying ? currentStr : '0:00'}</span>
          <span className="flex items-center gap-1">
            <Volume2 className="w-3 h-3 inline" />
            {duration}
          </span>
        </div>
      </div>
    </div>
  );
};
