import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Flower2, Smile, Music, Stars, Plus, Check } from 'lucide-react';
import { LoveReason } from '../types';

interface ReasonsDeckProps {
  reasons: LoveReason[];
  partnerName: string;
}

const getIcon = (iconName?: string) => {
  switch (iconName) {
    case 'Heart':
      return <Heart className="w-4 h-4 text-[#e11d48]" />;
    case 'Sparkles':
      return <Sparkles className="w-4 h-4 text-[#d88a9a]" />;
    case 'Flower2':
      return <Flower2 className="w-4 h-4 text-[#c87687]" />;
    case 'Smile':
      return <Smile className="w-4 h-4 text-[#eab308]" />;
    case 'Music':
      return <Music className="w-4 h-4 text-[#9b495c]" />;
    case 'Stars':
    default:
      return <Stars className="w-4 h-4 text-[#d88a9a]" />;
  }
};

export const ReasonsDeck: React.FC<ReasonsDeckProps> = ({ reasons, partnerName }) => {
  const [activeReasonId, setActiveReasonId] = useState<number | null>(null);

  return (
    <section id="reasons-deck" className="py-16 px-4 sm:px-6 bg-[#faf5f2] relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#b28e98] block mb-1">
            PEQUENOS GRANDES DETALHES • ❀
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#2e1e24] font-light">
            Motivos Pelos Quais Te Amo
          </h2>
          <p className="font-script text-2xl text-[#9b495c] mt-1">
            Cada detalhe em você, {partnerName}
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((reason, index) => {
            const isSelected = activeReasonId === reason.id;
            return (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => setActiveReasonId(isSelected ? null : reason.id)}
                className={`p-6 rounded-sm border cursor-pointer transition-all duration-300 relative group overflow-hidden ${
                  isSelected
                    ? 'bg-[#fbebee] border-[#e292a4] shadow-sm -translate-y-1'
                    : 'bg-white/90 border-[#eed6dc] hover:border-[#d88a9a] shadow-2xs hover:-translate-y-0.5'
                }`}
              >
                {/* Top Bar with Number & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-editorial text-xs font-light text-[#b28e98] tracking-widest uppercase">
                    MOTIVO NO. {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="p-1.5 rounded-full bg-[#fdf8f7] border border-[#eed6dc]">
                    {getIcon(reason.icon)}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-editorial text-lg text-[#2e1e24] font-normal leading-snug group-hover:text-[#9e465a] transition-colors">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="font-garamond text-sm text-[#664b54] mt-3 leading-relaxed">
                  {reason.description}
                </p>

                {/* Subtle indicator at bottom */}
                <div className="mt-4 pt-3 border-t border-[#f4e2e6] flex items-center justify-between text-[10px] font-mono text-[#b28e98] tracking-wider uppercase">
                  <span>✦ Meu carinho</span>
                  <span className="text-[#c87687] opacity-0 group-hover:opacity-100 transition-opacity">
                    {isSelected ? 'Lido ♡' : 'Toque para marcar'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-10">
          <p className="font-handwriting text-sm text-[#8c6773] italic">
            &ldquo;E mais mil outros motivos que o coração guarda em silêncio...&rdquo;
          </p>
        </div>

      </div>
    </section>
  );
};
