import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Star, ChevronRight, Eye, Camera, Loader2, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CoupleProfile } from '../types';
import { compressImageFile, downloadPhoto } from '../utils/photoStorage';

interface HeroZineProps {
  profile: CoupleProfile;
  assets: {
    coupleEmbrace: string;
    pinkLily?: string;
    pinkVinyl?: string;
    blueFlowers?: string;
    singleFlower?: string;
    chromeCross?: string;
    pinkFlowersEmblem?: string;
    pinkFlowerBloom?: string;
  };
  onOpenLetter: () => void;
  onOpenGallery: () => void;
  onUpdateProfile?: (updated: Partial<CoupleProfile>) => void;
}

export const HeroZine: React.FC<HeroZineProps> = ({
  profile,
  assets,
  onOpenLetter,
  onOpenGallery,
  onUpdateProfile,
}) => {
  const [isHoveringFrame, setIsHoveringFrame] = useState(false);
  const [starSpin, setStarSpin] = useState(0);
  const [isCompressingPhoto, setIsCompressingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const flowerImg = assets.pinkLily || assets.blueFlowers || assets.singleFlower;

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressingPhoto(true);
      const compressedDataUrl = await compressImageFile(file, 1600, 1600, 0.85);
      if (compressedDataUrl && onUpdateProfile) {
        onUpdateProfile({ heroPhoto: compressedDataUrl });
        confetti({
          particleCount: 35,
          spread: 70,
          origin: { y: 0.6, x: 0.3 },
          colors: ['#fbcfe8', '#fda4af', '#f472b6', '#ffffff'],
        });
      }
    } catch (err) {
      console.error('Erro ao processar e salvar foto:', err);
    } finally {
      setIsCompressingPhoto(false);
      // Reset input value so same file can be selected again if needed
      e.target.value = '';
    }
  };

  const handleStarClick = () => {
    setStarSpin((prev) => prev + 360);
    confetti({
      particleCount: 30,
      spread: 70,
      origin: { y: 0.45, x: 0.8 },
      colors: ['#ffffff', '#fbcfe8', '#f4abbb', '#e292a4', '#d88a9a'],
    });
  };

  const handleFlowerClick = () => {
    confetti({
      particleCount: 40,
      spread: 90,
      origin: { y: 0.75, x: 0.5 },
      colors: ['#fce7f3', '#fbcfe8', '#f472b6', '#fda4af', '#eedcdb', '#ffffff'],
      shapes: ['circle'],
    });
  };

  return (
    <section id="hero-zine" className="relative w-full pt-16 pb-8 bg-[#faf5f2] overflow-hidden">
      {/* Decorative subtle editorial markings */}
      <div className="absolute top-20 left-4 text-[10px] tracking-[0.3em] uppercase text-[#b28e98] pointer-events-none select-none font-mono">
        FELIZ ANIVERSÁRIO, EU TE AMO
      </div>
      <div className="absolute top-20 right-4 text-[10px] tracking-[0.3em] uppercase text-[#b28e98] pointer-events-none select-none font-mono">
        EDITION • GUF
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* =========================================================================
            SECTION 1: TOP BOTANICAL & EDITORIAL HEADER (Pink Lily & Turntable Theme)
           ========================================================================= */}
        <div className="relative pt-4 pb-10 sm:pb-14 border-b border-[#eed6dc]">
          <div className="grid grid-cols-12 gap-6 items-center">
            {/* Left Typography Block */}
            <div className="col-span-12 sm:col-span-5 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="font-editorial text-2xl sm:text-3xl tracking-[0.14em] uppercase text-[#2e1e24]">
                    {profile.heroHeading || "FELIZ ANIVERSÁRIO"}
                  </span>
                </div>

                <div className="flex items-baseline gap-3 sm:gap-4 mt-1 flex-wrap">
                  <span className="font-editorial text-3xl sm:text-4xl md:text-5xl font-light text-[#2e1e24]">
                    {profile.heroNumber || "12.09"}
                  </span>
                  <span className="font-editorial text-xl sm:text-2xl md:text-3xl tracking-widest uppercase text-[#9e465a]">
                    {profile.heroSubheading || "MEU AMOR."}
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    id="hero-open-letter-btn"
                    onClick={onOpenLetter}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#2e1e24] hover:text-[#9e465a] transition-colors border-b border-[#2e1e24] hover:border-[#9e465a] pb-0.5 group cursor-pointer"
                  >
                    <span>Ler Carta de Amor</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right: Botanical Pink Lily Flower Artwork with Reference Elements */}
            <div className="col-span-12 sm:col-span-7 relative flex justify-center sm:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="relative max-w-[360px] sm:max-w-[420px] cursor-pointer group"
                onClick={handleFlowerClick}
                title="Clique para celebrar com pétalas de lírio!"
              >
                {/* Vintage Reference Layout Elements */}
                {/* Behind: Big 'LILY' Lettering in soft blush rose */}
                <div className="absolute -top-6 left-2 right-2 flex items-center justify-between text-center select-none pointer-events-none z-0 opacity-40">
                  <span className="font-editorial text-6xl sm:text-7xl font-bold tracking-widest text-[#d88a9a]">
                    LILY
                  </span>
                </div>

                {/* Main Botanical Pink Lily Flower */}
                <div className="relative z-10 p-2">
                  <img
                    src={flowerImg}
                    alt="Delicate pink watercolor lily flower"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain drop-shadow-md group-hover:scale-[1.03] transition-transform duration-500 rounded-sm"
                  />
                </div>

                {/* Subtle Reference Archives stamp at bottom */}
                <div className="absolute -bottom-2 right-4 flex items-center gap-2 text-[10px] font-mono text-[#9b737f] tracking-widest z-20">
                  <span className="px-1.5 py-0.5 rounded-xs bg-[#f8e2e7] border border-[#eab1be]">
                    LILIUM • 590
                  </span>
                  <span className="text-xs">✦</span>
                </div>

                <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-white/90 border border-[#eed6dc] text-[10px] text-[#8c4e5e] tracking-wider opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-xs">
                  ❀ toque aqui
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 2: SIGNATURE DUSTY ROSE BANNER (Vintage Blush & Framed Romance)
           ========================================================================= */}
        <div className="relative my-0 -mx-4 sm:-mx-6 px-4 sm:px-10 py-10 sm:py-14 bg-gradient-to-r from-[#cf7b8d] via-[#c67284] to-[#bc6779] overflow-hidden text-white shadow-sm">
          
          {/* Subtle textured overlay / noise */}
          <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/10 pointer-events-none" />

          {/* Giant Brush Calligraphy Watermark in Background ("Love" / "Amor") */}
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
            <span
              className="font-script text-[180px] sm:text-[280px] md:text-[340px] text-white/[0.16] font-bold tracking-tight transform -rotate-3 scale-110 whitespace-nowrap"
              style={{ textShadow: '0 0 40px rgba(255,255,255,0.2)' }}
            >
              Love
            </span>
          </div>

          <div className="relative z-10 grid grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Left: Framed Couple Photo (Gustavo & Rayssa) */}
            <div className="col-span-12 md:col-span-6 flex justify-center md:justify-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative group"
                onMouseEnter={() => setIsHoveringFrame(true)}
                onMouseLeave={() => setIsHoveringFrame(false)}
              >
                {/* Vintage Editorial Black/Espresso Double Frame with Rose Hue */}
                <div 
                  className="relative p-1.5 bg-[#23151b] rounded-xs shadow-2xl transition-transform duration-500 group-hover:-translate-y-1 cursor-pointer border border-white/20"
                  onClick={onOpenGallery}
                  title="Clique para ver a galeria do casal"
                >
                  <div className="relative overflow-hidden bg-[#faf5f2] border border-black/40">
                    <img
                      src={profile.heroPhoto || assets.coupleEmbrace}
                      alt={`${profile.userName} & ${profile.partnerName}`}
                      referrerPolicy="no-referrer"
                      className={`w-[280px] sm:w-[320px] md:w-[340px] aspect-square object-cover ${!profile.heroPhoto || profile.heroPhoto.includes('IMG_1756_0cb49174') ? 'object-[50%_58%]' : 'object-center'} contrast-105 group-hover:scale-105 transition-transform duration-700`}
                    />

                    {/* Overlay subtle grain */}
                    <div className="absolute inset-0 bg-black/[0.02] pointer-events-none" />

                    {/* Interactive hint */}
                    <div
                      className={`absolute inset-0 bg-black/45 flex flex-col items-center justify-center gap-2 text-white transition-opacity duration-300 ${
                        isHoveringFrame ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <Eye className="w-6 h-6 text-white animate-pulse" />
                      <span className="text-xs uppercase tracking-[0.2em] font-medium">
                        Ver Nossa Galeria
                      </span>
                    </div>
                  </div>
                </div>

                {/* Aesthetic corner tag in warm dark plum */}
                <div className="absolute -bottom-3 -left-3 bg-[#2a1720] text-[#fceef1] text-[10px] font-mono px-2.5 py-0.5 tracking-widest shadow-md border border-white/10">
                  MEMÓRIA • {profile.userName} & {profile.partnerName}
                </div>

                {/* Quick direct upload button */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
                {/* Action buttons: Trocar Foto & Salvar Foto */}
                <div className="absolute -bottom-3 -right-2 flex items-center gap-1.5 z-10">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadPhoto(
                        profile.heroPhoto || assets.coupleEmbrace,
                        `foto_${profile.userName}_${profile.partnerName}.jpg`
                      );
                    }}
                    title="Baixar esta foto para seu dispositivo"
                    className="bg-white/95 hover:bg-white text-[#2a1720] hover:text-[#9e465a] text-[10px] font-mono px-2 py-0.5 tracking-wider shadow-md rounded-xs border border-[#eed6dc] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Download className="w-3 h-3 text-[#9e465a]" />
                    <span className="hidden xs:inline">Salvar</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isCompressingPhoto) {
                        fileInputRef.current?.click();
                      }
                    }}
                    disabled={isCompressingPhoto}
                    title="Trocar ou enviar outra foto do casal"
                    className="bg-white/95 hover:bg-white text-[#2a1720] hover:text-[#9e465a] text-[10px] font-mono px-2.5 py-0.5 tracking-wider shadow-md rounded-xs border border-[#eed6dc] flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-75"
                  >
                    {isCompressingPhoto ? (
                      <>
                        <Loader2 className="w-3 h-3 text-[#9e465a] animate-spin" />
                        <span>Salvando...</span>
                      </>
                    ) : (
                      <>
                        <Camera className="w-3 h-3 text-[#9e465a]" />
                        <span>Trocar Foto</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right: Pink Botanical Flowers + História / Por que te amo Poetry + Giant Date */}
            <div className="col-span-12 md:col-span-6 flex flex-col justify-between h-full relative">
              
              {/* Pink Botanical Flowers Emblem (Replaces chrome cross) */}
              <div className="flex justify-end mb-4">
                <motion.div
                  animate={{ rotate: starSpin }}
                  transition={{ type: 'spring', damping: 15, stiffness: 90 }}
                  onClick={handleStarClick}
                  className="relative cursor-pointer group flex items-center"
                  title="Clique para celebrar com pétalas de flores!"
                >
                  {/* Decorative secondary flower bloom (soft pink blossom) */}
                  {assets.pinkFlowerBloom && (
                    <div className="w-11 h-11 sm:w-13 sm:h-13 -mr-3 relative z-10 rounded-full overflow-hidden border border-white/40 shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform bg-white/10 backdrop-blur-xs">
                      <img
                        src={assets.pinkFlowerBloom}
                        alt="Flor rosa botânica"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Main Pink Flowers Cluster Emblem */}
                  <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white/40 shadow-xl relative bg-white/15 backdrop-blur-xs group-hover:border-white/80 transition-colors">
                    <img
                      src={assets.pinkFlowersEmblem || assets.chromeCross}
                      alt="Flores botânicas rosas"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <span className="absolute -top-1 -right-1 text-white text-xs opacity-90 animate-pulse pointer-events-none">
                    ❀
                  </span>
                </motion.div>
              </div>

              {/* Poetic Quote & Excerpt */}
              <div className="space-y-4 max-w-md ml-auto text-right">
                <h3 className="font-script text-3xl sm:text-4xl text-white font-normal leading-tight">
                  {profile.storyTitle || "por que te amo"}
                </h3>

                <p className="font-editorial italic text-xs sm:text-sm text-white/95 leading-relaxed font-light">
                  &ldquo;{profile.customQuote}&rdquo;
                </p>

                <div className="text-[11px] font-mono tracking-widest text-white/80 uppercase pt-1">
                  Eterno no coração • {profile.partnerName}
                </div>
              </div>

              {/* Giant Serif Number */}
              <div className="mt-8 flex justify-end items-baseline overflow-hidden">
                <span className="font-editorial text-5xl sm:text-6xl md:text-8xl font-light text-white leading-none tracking-tight select-none">
                  {profile.heroNumber}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
