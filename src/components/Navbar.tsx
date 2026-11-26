import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Volume2, VolumeX, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/audioSynth';

interface NavbarProps {
  onOpenLetter: () => void;
  onOpenCustomizer?: () => void;
  partnerName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLetter,
  partnerName,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    const unsubscribe = romanticAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const toggleMusic = () => {
    romanticAudio.toggle();
  };

  const triggerSparkles = () => {
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.1 },
      colors: ['#f4abbb', '#e292a4', '#fbcfe8', '#eedcdb', '#c56e80', '#ffffff'],
      shapes: ['circle', 'square'],
      ticks: 200,
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#faf5f2]/95 backdrop-blur-md border-b border-[#ebd8dc] py-2.5 shadow-xs'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Romantic Title / Logo */}
        <button
          id="nav-logo-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#f6d7de]/60 border border-[#eab1be] flex items-center justify-center text-[#9b495c] group-hover:scale-105 transition-transform shadow-xs">
            <Heart className="w-4 h-4 fill-[#e292a4]/50 text-[#9b495c]" />
          </div>
          <div>
            <span className="font-editorial text-lg tracking-wider text-[#2e1e24] block leading-none">
              PARA VOCÊ
            </span>
            <span className="font-script text-xs text-[#a06373] block -mt-0.5">
              {partnerName || 'meu amor'}
            </span>
          </div>
        </button>

        {/* Center: Editorial Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase font-medium text-[#73525d]">
          <button
            id="nav-home"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-[#2e1e24] hover:tracking-[0.25em] transition-all cursor-pointer"
          >
            HOME
          </button>
          <button
            id="nav-gallery"
            onClick={() => scrollToSection('memory-gallery')}
            className="hover:text-[#2e1e24] hover:tracking-[0.25em] transition-all cursor-pointer"
          >
            GALERIA
          </button>
          <button
            id="nav-reasons"
            onClick={() => scrollToSection('reasons-deck')}
            className="hover:text-[#2e1e24] hover:tracking-[0.25em] transition-all cursor-pointer"
          >
            MOTIVOS
          </button>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ambient Music Button */}
          <button
            id="nav-music-toggle"
            onClick={toggleMusic}
            title={isPlaying ? 'Pausar Baby Be Mine (Michael Jackson)' : 'Tocar Baby Be Mine (Michael Jackson)'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${
              isPlaying
                ? 'bg-[#f8e1e7] border-[#e29aa9] text-[#7d2f42]'
                : 'bg-white/85 border-[#eed5da] text-[#73525d] hover:border-[#df9eac]'
            }`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#9b495c] animate-pulse" />
                <span className="hidden sm:inline text-[11px] tracking-wider uppercase font-semibold">Música On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#b08b96]" />
                <span className="hidden sm:inline text-[11px] tracking-wider uppercase">Música</span>
              </>
            )}
          </button>

          {/* Sparkles / Petals trigger */}
          <button
            id="nav-sparkle-btn"
            onClick={triggerSparkles}
            title="Lançar pétalas e estrelas"
            className="p-1.5 sm:p-2 rounded-full bg-white/85 border border-[#eed5da] text-[#9b495c] hover:bg-[#fceef1] hover:border-[#df9eac] transition-all cursor-pointer hover:rotate-12"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Love Letter Modal Trigger */}
          <button
            id="nav-letter-btn"
            onClick={onOpenLetter}
            title="Abrir Carta Secreta"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2e1e24] text-white hover:bg-[#4a2f3a] transition-all text-xs font-medium cursor-pointer shadow-xs"
          >
            <Mail className="w-3.5 h-3.5 text-[#f4abbb]" />
            <span className="text-[11px] tracking-wider uppercase">Carta</span>
          </button>
        </div>
      </div>
    </header>
  );
};
