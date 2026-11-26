import React from 'react';
import { Heart, ArrowUp, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FooterZineProps {
  partnerName: string;
  userName: string;
  onOpenLetter: () => void;
}

export const FooterZine: React.FC<FooterZineProps> = ({
  partnerName,
  userName,
  onOpenLetter,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalKiss = () => {
    confetti({
      particleCount: 65,
      spread: 100,
      origin: { y: 0.9 },
      colors: ['#fbcfe8', '#fda4af', '#f472b6', '#e292a4', '#ffffff'],
    });
  };

  return (
    <footer className="py-14 px-4 sm:px-6 bg-[#23151b] text-white relative overflow-hidden">
      {/* Background Japanese Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] sm:text-[240px] font-jp text-white/[0.02] pointer-events-none select-none">
        心
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
        {/* Heart icon */}
        <div className="flex justify-center">
          <button
            onClick={handleFinalKiss}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer group"
            title="Enviar um beijo e pétalas de lírio!"
          >
            <Heart className="w-5 h-5 fill-[#f4abbb] text-[#f4abbb] group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Romantic Signature */}
        <div>
          <span className="font-editorial text-2xl sm:text-3xl tracking-widest uppercase block">
            {userName} & {partnerName}
          </span>
          <p className="font-script text-3xl sm:text-4xl text-[#f4abbb] mt-1">
            Para Todo o Sempre
          </p>
        </div>

        {/* Small editorial notes */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/50 tracking-widest uppercase gap-4">
          <div>
            FEITO COM TODO O AMOR DO MEU CORAÇÃO • ❀
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenLetter}
              className="hover:text-white transition-colors underline cursor-pointer"
            >
              Reabrir Carta
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Voltar ao Topo</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
