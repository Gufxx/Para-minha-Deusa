import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroZine } from './components/HeroZine';
import { ReasonsDeck } from './components/ReasonsDeck';
import { MemoryGallery } from './components/MemoryGallery';
import { MusicPlayerBar } from './components/MusicPlayerBar';
import { LoveLetterModal } from './components/LoveLetterModal';
import { FooterZine } from './components/FooterZine';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import {
  initialProfile,
  defaultAssets,
  defaultReasons,
  defaultGallery,
} from './data/defaultContent';
import { CoupleProfile, MemoryPhoto, LoveReason } from './types';
import {
  getItemFromDB,
  setItemInDB,
  safeGetLocalStorage,
  safeSetLocalStorage,
  STORAGE_KEYS,
} from './utils/photoStorage';

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // 1. Initial State from localStorage (synchronous hydration)
  const [profile, setProfile] = useState<CoupleProfile>(() => {
    const saved =
      safeGetLocalStorage<CoupleProfile>(STORAGE_KEYS.PROFILE) ||
      safeGetLocalStorage<CoupleProfile>(STORAGE_KEYS.LEGACY_PROFILE);

    if (saved) {
      return {
        ...initialProfile,
        ...saved,
        secretLetter: (!saved.secretLetter || saved.secretLetter.includes("Quando penso em você, o mundo parece desacelerar") || !saved.secretLetter.includes("Pokémon GO"))
          ? initialProfile.secretLetter
          : saved.secretLetter,
        songTitle: (!saved.songTitle || saved.songTitle.includes("Lover's Theme")) ? "Baby Be Mine" : saved.songTitle,
        songArtist: (!saved.songArtist || saved.songArtist.includes("Para Você")) ? "Michael Jackson" : saved.songArtist,
        spotifyUrl: saved.spotifyUrl || "https://open.spotify.com/intl-pt/track/3bMveJpCPytU79V5A61Bb7?si=b978f6202fd3484d",
        partnerName: (!saved.partnerName || saved.partnerName === "Minha Vida") ? "Rayssa" : saved.partnerName,
        userName: saved.userName || "Gustavo",
        heroNumber: saved.heroNumber === "09" ? "12.09" : (saved.heroNumber || "12.09"),
        heroHeading: saved.heroHeading || initialProfile.heroHeading,
        heroSubheading: saved.heroSubheading || initialProfile.heroSubheading,
        heroTagline: saved.heroTagline || initialProfile.heroTagline,
        storyTitle: (!saved.storyTitle || saved.storyTitle === "história") ? "por que te amo" : saved.storyTitle,
        customQuote: (!saved.customQuote || saved.customQuote.includes("soft Spring nights"))
          ? "Eu te amo porque você é forte, incrível e me inspira todos os dias"
          : saved.customQuote,
      };
    }
    return initialProfile;
  });

  const LEGACY_PLACEHOLDER_PATTERNS = [
    'gustavo_rayssa_couch_1789095457155',
    'couple_embrace_1787609748063',
    'pink_lily_flower_1789098614817',
    'pink_vinyl_lily_1789098629427',
    'pink_flower_bloom_1789099620864',
    'pink_flowers_emblem_1789099609601',
  ];

  const MIGRATION_FLAG_KEY = 'namorada_site_photos_migrated_v3';

  const isLegacyPlaceholder = (url?: string) =>
    Boolean(url && LEGACY_PLACEHOLDER_PATTERNS.some((pattern) => url.includes(pattern)));

  const migrateGalleryPhotos = (existing: MemoryPhoto[]): MemoryPhoto[] => {
    let alreadyMigrated = false;
    try {
      alreadyMigrated = localStorage.getItem(MIGRATION_FLAG_KEY) === 'true';
    } catch {
      alreadyMigrated = false;
    }

    const hasLegacyPlaceholders = existing.some((p) => isLegacyPlaceholder(p.imageUrl));
    if (alreadyMigrated && !hasLegacyPlaceholders) {
      return existing;
    }

    // Keep any custom user-added photos (not old stock/AI placeholders)
    const customPhotos = existing.filter(
      (p) =>
        !isLegacyPlaceholder(p.imageUrl) &&
        !defaultGallery.some((d) => d.imageUrl === p.imageUrl)
    );

    const merged = [...customPhotos, ...defaultGallery];
    try {
      localStorage.setItem(MIGRATION_FLAG_KEY, 'true');
    } catch {
      // Ignore storage errors
    }
    return merged;
  };

  const [photos, setPhotos] = useState<MemoryPhoto[]>(() => {
    const saved =
      safeGetLocalStorage<MemoryPhoto[]>(STORAGE_KEYS.PHOTOS) ||
      safeGetLocalStorage<MemoryPhoto[]>(STORAGE_KEYS.LEGACY_PHOTOS);

    if (saved && Array.isArray(saved) && saved.length > 0) {
      return migrateGalleryPhotos(saved);
    }
    return defaultGallery;
  });

  const [reasons] = useState<LoveReason[]>(defaultReasons);

  // Modals state
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const isHydratedRef = useRef(false);

  // 2. Asynchronous hydration from IndexedDB (persists unlimited photo data without 5MB quota)
  useEffect(() => {
    let isMounted = true;

    async function loadPersistedStorage() {
      try {
        // Load Photos from IndexedDB first
        const dbPhotos = await getItemFromDB<MemoryPhoto[]>(STORAGE_KEYS.PHOTOS);
        const localPhotos =
          safeGetLocalStorage<MemoryPhoto[]>(STORAGE_KEYS.PHOTOS) ||
          safeGetLocalStorage<MemoryPhoto[]>(STORAGE_KEYS.LEGACY_PHOTOS);

        const loadedPhotos =
          dbPhotos && Array.isArray(dbPhotos) && dbPhotos.length > 0
            ? dbPhotos
            : localPhotos && Array.isArray(localPhotos) && localPhotos.length > 0
            ? localPhotos
            : null;

        if (isMounted) {
          if (loadedPhotos && loadedPhotos.length > 0) {
            const migrated = migrateGalleryPhotos(loadedPhotos);
            setPhotos(migrated);
            await setItemInDB(STORAGE_KEYS.PHOTOS, migrated);
            safeSetLocalStorage(STORAGE_KEYS.PHOTOS, migrated);
          } else {
            await setItemInDB(STORAGE_KEYS.PHOTOS, defaultGallery);
          }
        }

        // Load Profile & Hero Photo from IndexedDB
        const dbProfile = await getItemFromDB<CoupleProfile>(STORAGE_KEYS.PROFILE);
        const dbHeroPhoto = await getItemFromDB<string>(STORAGE_KEYS.HERO_PHOTO);
        const localProfile =
          safeGetLocalStorage<CoupleProfile>(STORAGE_KEYS.PROFILE) ||
          safeGetLocalStorage<CoupleProfile>(STORAGE_KEYS.LEGACY_PROFILE);

        const sourceProfile = dbProfile || localProfile;

        if (isMounted) {
          setProfile((prev) => {
            const rawHero = dbHeroPhoto || sourceProfile?.heroPhoto || prev.heroPhoto;
            const resolvedHero = isLegacyPlaceholder(rawHero)
              ? defaultAssets.coupleEmbrace
              : rawHero;

            const merged = {
              ...prev,
              ...(sourceProfile || {}),
              heroPhoto: resolvedHero,
            };
            if (
              !merged.secretLetter ||
              merged.secretLetter.includes('Quando penso em você, o mundo parece desacelerar') ||
              !merged.secretLetter.includes('Pokémon GO')
            ) {
              merged.secretLetter = initialProfile.secretLetter;
            }
            return merged;
          });
        }
      } catch (err) {
        console.warn('Falha ao restaurar dados do IndexedDB:', err);
      } finally {
        if (isMounted) {
          isHydratedRef.current = true;
        }
      }
    }

    loadPersistedStorage();

    return () => {
      isMounted = false;
    };
  }, []);

  // 3. Save profile changes to IndexedDB and localStorage (ONLY after hydration)
  useEffect(() => {
    if (!isHydratedRef.current) return;
    setItemInDB(STORAGE_KEYS.PROFILE, profile);
    if (profile.heroPhoto) {
      setItemInDB(STORAGE_KEYS.HERO_PHOTO, profile.heroPhoto);
    }
    safeSetLocalStorage(STORAGE_KEYS.PROFILE, profile);
  }, [profile]);

  // 4. Save photos changes to IndexedDB and localStorage (ONLY after hydration)
  useEffect(() => {
    if (!isHydratedRef.current) return;
    setItemInDB(STORAGE_KEYS.PHOTOS, photos);
    safeSetLocalStorage(STORAGE_KEYS.PHOTOS, photos);
  }, [photos]);

  const handleUpdateProfile = (updated: Partial<CoupleProfile>) => {
    setProfile((prev) => {
      const nextProfile = { ...prev, ...updated };
      setItemInDB(STORAGE_KEYS.PROFILE, nextProfile);
      if (nextProfile.heroPhoto) {
        setItemInDB(STORAGE_KEYS.HERO_PHOTO, nextProfile.heroPhoto);
      }
      safeSetLocalStorage(STORAGE_KEYS.PROFILE, nextProfile);
      return nextProfile;
    });
    if (updated.heroPhoto) {
      showToast('Foto do casal atualizada e salva com sucesso!');
    }
  };

  const handleAddPhoto = (newPhoto: MemoryPhoto) => {
    setPhotos((prev) => {
      const updated = [newPhoto, ...prev.filter((p) => p.id !== newPhoto.id)];
      setItemInDB(STORAGE_KEYS.PHOTOS, updated);
      safeSetLocalStorage(STORAGE_KEYS.PHOTOS, updated);
      return updated;
    });
    showToast('Nova foto adicionada e salva com sucesso!');
  };

  const handleAddPhotos = (newPhotos: MemoryPhoto[]) => {
    setPhotos((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const filteredNew = newPhotos.filter((p) => !existingIds.has(p.id));
      const updated = [...filteredNew, ...prev];
      setItemInDB(STORAGE_KEYS.PHOTOS, updated);
      safeSetLocalStorage(STORAGE_KEYS.PHOTOS, updated);
      return updated;
    });
    showToast(`${newPhotos.length} fotos salvas com segurança no álbum!`);
  };

  const handleDeletePhoto = (id: string) => {
    setPhotos((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      setItemInDB(STORAGE_KEYS.PHOTOS, updated);
      safeSetLocalStorage(STORAGE_KEYS.PHOTOS, updated);
      return updated;
    });
    showToast('Foto removida da galeria.');
  };

  const scrollToGallery = () => {
    const el = document.getElementById('memory-gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf5f2] text-[#2e1e24] relative flex flex-col font-sans selection:bg-[#f4abbb]/40 selection:text-[#2e1e24]">
      {/* Toast Notification for Confirmation */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 sm:right-8 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#2e1e24] text-white shadow-xl text-xs font-mono tracking-wide border border-[#eed6dc]/30"
          >
            <span className="w-5 h-5 rounded-full bg-[#e88195] text-white flex items-center justify-center">
              <Check className="w-3 h-3" />
            </span>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Bar */}
      <Navbar
        partnerName={profile.partnerName}
        onOpenLetter={() => setIsLetterOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Editorial Collage Hero matching the Pinterest reference image */}
        <HeroZine
          profile={profile}
          assets={defaultAssets}
          onOpenLetter={() => setIsLetterOpen(true)}
          onOpenGallery={scrollToGallery}
          onUpdateProfile={handleUpdateProfile}
        />

        {/* Reasons Why I Love You (Card Deck) */}
        <ReasonsDeck
          reasons={reasons}
          partnerName={profile.partnerName}
        />

        {/* Polaroid Memory Gallery & Photo Wall */}
        <MemoryGallery
          photos={photos}
          onAddPhoto={handleAddPhoto}
          onAddPhotos={handleAddPhotos}
          onDeletePhoto={handleDeletePhoto}
          partnerName={profile.partnerName}
        />
      </main>

      {/* Floating Ambient Music Player */}
      <MusicPlayerBar
        songTitle={profile.songTitle}
        songArtist={profile.songArtist}
        spotifyUrl={profile.spotifyUrl}
      />

      {/* Wax-Sealed Love Letter Modal */}
      <LoveLetterModal
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
        letterText={profile.secretLetter}
        partnerName={profile.partnerName}
        userName={profile.userName}
      />

      {/* Editorial Zine Footer */}
      <FooterZine
        partnerName={profile.partnerName}
        userName={profile.userName}
        onOpenLetter={() => setIsLetterOpen(true)}
      />
    </div>
  );
}
