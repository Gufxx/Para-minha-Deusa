import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Mail, Sparkles, Check, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LoveLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  letterText: string;
  partnerName: string;
  userName: string;
}

export const LoveLetterModal: React.FC<LoveLetterModalProps> = ({
  isOpen,
  onClose,
  letterText,
  partnerName,
  userName,
}) => {
  const [isSealed, setIsSealed] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleOpenEnvelope = () => {
    setIsSealed(false);
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.5 },
      colors: ['#fbcfe8', '#fda4af', '#f472b6', '#e292a4', '#ffffff'],
    });
  };

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(letterText);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = letterText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="love-letter-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-[#faf5f2] rounded-sm p-6 sm:p-10 border border-[#eed6dc] shadow-2xl my-8 paper-texture scrollbar-thin"
      >
        {/* Close button */}
        <button
          id="close-letter-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#785b65] hover:text-[#2e1e24] transition-colors rounded-full hover:bg-black/5 cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {isSealed ? (
          /* Sealed Envelope View */
          <div className="py-12 text-center flex flex-col items-center justify-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-[#f8e2e7] border border-[#eab1be] flex items-center justify-center">
              <Mail className="w-10 h-10 text-[#9e465a]" />
            </div>

            <div>
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#b28e98] block">
                Uma carta especial para
              </span>
              <h3 className="font-editorial text-3xl text-[#2e1e24] mt-1">
                {partnerName}
              </h3>
              <p className="font-script text-2xl text-[#9b495c] mt-1">
                Com todo o amor do mundo
              </p>
            </div>

            {/* Wax Seal Button */}
            <motion.button
              id="open-wax-seal-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenEnvelope}
              className="relative group px-8 py-3.5 rounded-full bg-[#8c2b3a] hover:bg-[#72202d] text-white shadow-lg cursor-pointer flex items-center gap-3 transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-[#6d1b28] flex items-center justify-center border border-white/30">
                <Heart className="w-3.5 h-3.5 fill-white text-white" />
              </div>
              <span className="font-editorial tracking-widest text-xs uppercase">
                Quebrar o Lacre & Ler
              </span>
              <Sparkles className="w-4 h-4 text-[#fcd34d]" />
            </motion.button>
          </div>
        ) : (
          /* Unsealed Letter Content */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Header / Date */}
            <div className="border-b border-[#eed6dc] pb-4 mb-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#b28e98]">
                  CARTA DE AMOR • CONFIDENCIAL • ❀
                </span>
                <h4 className="font-script text-2xl text-[#2e1e24] leading-none mt-1">
                  Para o amor da minha vida
                </h4>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#8c2b3a]/10 border border-[#8c2b3a]/30 flex items-center justify-center">
                <Heart className="w-4 h-4 fill-[#8c2b3a] text-[#8c2b3a]" />
              </div>
            </div>

            {/* Letter Body in Elegant Serif & Script */}
            <div className="prose max-w-none text-[#2e1e24] font-garamond text-base sm:text-lg leading-relaxed whitespace-pre-line my-6 font-normal">
              {letterText}
            </div>

            {/* Signature */}
            <div className="mt-8 pt-6 border-t border-[#eed6dc] flex items-end justify-between">
              <div>
                <span className="font-handwriting text-xs text-[#8c6773] block">
                  Com carinho eterno,
                </span>
                <span className="font-script text-3xl text-[#2e1e24] block mt-1">
                  {userName}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  id="copy-letter-btn"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#eed6dc] text-xs font-mono text-[#785b65] hover:text-[#2e1e24] hover:bg-white transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Texto</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
