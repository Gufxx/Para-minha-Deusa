import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Disc, ExternalLink, ChevronUp, ChevronDown, Music } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynth';

interface MusicPlayerBarProps {
  songTitle: string;
  songArtist: string;
  spotifyUrl?: string;
}

export const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({
  songTitle,
  songArtist,
  spotifyUrl = "https://open.spotify.com/intl-pt/track/3bMveJpCPytU79V5A61Bb7?si=b978f6202fd3484d",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [showSpotifyWidget, setShowSpotifyWidget] = useState(false);

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const togglePlay = () => {
    romanticAudio.toggle();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    romanticAudio.setVolume(newVol);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2">
      {/* Optional Pop-up Spotify Official Embed Card */}
      {showSpotifyWidget && (
        <div className="w-[320px] sm:w-[380px] bg-[#121212] p-2.5 rounded-2xl shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 px-1 text-xs text-white/70">
            <span className="font-mono text-[11px] tracking-wider uppercase flex items-center gap-1.5 text-[#1DB954]">
              <Music className="w-3.5 h-3.5" />
              Spotify Player
            </span>
            <button
              onClick={() => setShowSpotifyWidget(false)}
              className="text-white/50 hover:text-white text-xs cursor-pointer px-1 py-0.5 rounded-sm"
            >
              Fechar ✕
            </button>
          </div>
          <iframe
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/track/3bMveJpCPytU79V5A61Bb7?utm_source=generator&theme=0"
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Embed: Baby Be Mine"
          />
        </div>
      )}

      {/* Main Floating Glass Bar */}
      <div
        id="romantic-music-bar"
        className="w-auto max-w-sm sm:max-w-md bg-[#faf5f2]/95 backdrop-blur-md px-3.5 sm:px-4 py-2.5 rounded-full border border-[#eed6dc] shadow-lg flex items-center gap-2.5 sm:gap-4 transition-all"
      >
        {/* Pink vinyl record spinning indicator (matching reference turntable) */}
        <button
          onClick={togglePlay}
          id="mini-player-vinyl-btn"
          className="relative group cursor-pointer flex-shrink-0"
          title={isPlaying ? 'Pausar música' : 'Tocar Michael Jackson - Baby Be Mine'}
        >
          <div
            className={`w-9 h-9 rounded-full bg-gradient-to-tr from-[#e292a4] to-[#f4abbb] border-2 border-[#d88a9a] flex items-center justify-center text-[#2e1e24] shadow-xs relative overflow-hidden ${
              isPlaying ? 'animate-[spin_3.5s_linear_infinite]' : ''
            }`}
          >
            {/* Concentric groove lines */}
            <div className="absolute inset-1 rounded-full border border-white/40 pointer-events-none" />
            <div className="absolute inset-2 rounded-full border border-white/30 pointer-events-none" />
            {/* Center label */}
            <div className="w-3.5 h-3.5 rounded-full bg-[#faf5f2] border border-[#d88a9a] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#2e1e24]" />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-[#2e1e24]/60 rounded-full transition-opacity text-white">
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </div>
        </button>

        {/* Song Info */}
        <div className="flex flex-col min-w-0 pr-1">
          <div className="flex items-center gap-1.5">
            <span className="font-editorial text-xs font-semibold text-[#2e1e24] truncate max-w-[120px] sm:max-w-[160px]">
              {songTitle}
            </span>
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-2.5">
                <span className="w-0.5 bg-[#c87687] h-full animate-[bounce_0.6s_infinite]" />
                <span className="w-0.5 bg-[#c87687] h-2/3 animate-[bounce_0.8s_infinite]" />
                <span className="w-0.5 bg-[#c87687] h-full animate-[bounce_0.5s_infinite]" />
              </div>
            )}
          </div>
          <span className="font-sans text-[11px] text-[#785b65] truncate max-w-[120px] sm:max-w-[160px]">
            {songArtist}
          </span>
        </div>

        {/* Play/Pause Button */}
        <button
          id="mini-player-toggle"
          onClick={togglePlay}
          title={isPlaying ? 'Pausar música' : 'Tocar Baby Be Mine'}
          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
            isPlaying ? 'bg-[#2e1e24] text-white hover:bg-[#462d36]' : 'bg-[#f4e2e6] hover:bg-[#ebd0d6] text-[#2e1e24]'
          }`}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </button>

        {/* Spotify Actions */}
        <div className="flex items-center gap-1 pl-1 border-l border-[#eed6dc]">
          {/* External link to Spotify */}
          <a
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Ouvir no Spotify"
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#1DB954]/10 hover:bg-[#1DB954]/20 text-[#15803d] hover:text-[#166534] text-[10px] font-semibold tracking-wider uppercase transition-colors"
          >
            <span>Spotify</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>

          {/* Toggle mini player widget */}
          <button
            onClick={() => setShowSpotifyWidget(!showSpotifyWidget)}
            title={showSpotifyWidget ? "Ocultar player do Spotify" : "Exibir player do Spotify"}
            className="p-1 text-[#785b65] hover:text-[#2e1e24] rounded-full hover:bg-[#f4e2e6] transition-colors cursor-pointer"
          >
            {showSpotifyWidget ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Volume slider */}
        <div className="hidden sm:flex items-center gap-1.5 pl-1 border-l border-[#eed6dc]">
          {volume === 0 ? (
            <VolumeX className="w-3.5 h-3.5 text-[#b28e98]" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-[#785b65]" />
          )}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-12 h-1 accent-[#c87687] bg-[#eed6dc] rounded-lg appearance-none cursor-pointer"
            title="Volume"
          />
        </div>
      </div>
    </div>
  );
};
