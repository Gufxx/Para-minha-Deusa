import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera,
  Plus,
  X,
  Eye,
  Download,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  Loader2,
  Trash2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MemoryPhoto } from '../types';
import {
  compressImageFile,
  compressMultipleImages,
  downloadPhoto,
} from '../utils/photoStorage';

interface MemoryGalleryProps {
  photos: MemoryPhoto[];
  onAddPhoto: (newPhoto: MemoryPhoto) => void;
  onAddPhotos?: (newPhotos: MemoryPhoto[]) => void;
  onDeletePhoto: (id: string) => void;
  partnerName: string;
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({
  photos,
  onAddPhoto,
  onAddPhotos,
  onDeletePhoto,
  partnerName,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processProgress, setProcessProgress] = useState<{ current: number; total: number } | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Form state for single photo add modal
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const singleFileInputRef = useRef<HTMLInputElement>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  // Handle single photo upload from modal
  const handleSingleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      const compressed = await compressImageFile(file, 1400, 1400, 0.85);
      if (compressed) {
        setNewImageUrl(compressed);
      }
    } catch (err) {
      console.error('Erro ao processar imagem:', err);
    } finally {
      setIsProcessing(false);
      e.target.value = '';
    }
  };

  // Handle batch multiple photo upload
  const handleBatchUpload = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    try {
      setIsProcessing(true);
      setProcessProgress({ current: 0, total: files.length });

      const compressedResults = await compressMultipleImages(files, (curr, tot) => {
        setProcessProgress({ current: curr, total: tot });
      });

      if (compressedResults.length > 0) {
        const newMemoryPhotos: MemoryPhoto[] = compressedResults.map((item, idx) => ({
          id: `photo_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
          title: item.name || `Momento Especial ${idx + 1}`,
          date: new Date().toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }),
          caption: 'Uma recordação guardada para sempre no nosso coração.',
          imageUrl: item.dataUrl,
          rotation: Math.random() * 5 - 2.5,
        }));

        if (onAddPhotos) {
          onAddPhotos(newMemoryPhotos);
        } else {
          newMemoryPhotos.forEach((p) => onAddPhoto(p));
        }

        confetti({
          particleCount: 50,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#fbcfe8', '#fda4af', '#f472b6', '#ffffff'],
        });
      }
    } catch (err) {
      console.error('Erro ao fazer upload múltiplo:', err);
    } finally {
      setIsProcessing(false);
      setProcessProgress(null);
    }
  };

  // Submit single photo from modal
  const handleSubmitNewPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl) return;

    const newPhoto: MemoryPhoto = {
      id: `photo_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: newTitle.trim() || 'Nosso Momento Especial',
      date: new Date().toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }),
      caption: newCaption.trim() || 'Uma lembrança eterna com você.',
      imageUrl: newImageUrl,
      rotation: Math.random() * 5 - 2.5,
    };

    onAddPhoto(newPhoto);
    setNewTitle('');
    setNewCaption('');
    setNewImageUrl('');
    setIsAdding(false);

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#fbcfe8', '#fda4af', '#f472b6', '#ffffff'],
    });
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      await handleBatchUpload(droppedFiles);
    }
  };

  // Download all photos
  const handleDownloadAll = () => {
    photos.forEach((photo, idx) => {
      setTimeout(() => {
        downloadPhoto(photo.imageUrl, `${idx + 1}_${photo.title.replace(/\s+/g, '_')}.jpg`);
      }, idx * 250);
    });
  };

  return (
    <section
      id="memory-gallery"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`py-16 px-4 sm:px-6 bg-[#faf5f2] relative transition-colors duration-300 ${
        isDraggingOver ? 'bg-[#f8ebef] ring-4 ring-[#c87687]/40 ring-inset' : ''
      }`}
    >
      {/* Visual drag-and-drop feedback overlay */}
      {isDraggingOver && (
        <div className="absolute inset-0 z-30 bg-[#fcedf1]/80 backdrop-blur-xs flex flex-col items-center justify-center pointer-events-none text-center p-6">
          <UploadCloud className="w-16 h-16 text-[#9e465a] animate-bounce mb-3" />
          <h3 className="font-editorial text-3xl text-[#2e1e24] font-light">
            Solte suas fotos aqui
          </h3>
          <p className="text-sm font-handwriting text-[#8c6773] mt-2">
            Elas serão salvas instantaneamente no álbum do casal!
          </p>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 border-b border-[#eed6dc] pb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#b28e98] block">
                ÁLBUM DE RECORDAÇÕES • ❀
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-[#f4e2e7] text-[#9b495c] px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                Salvas no Navegador ({photos.length})
              </span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl text-[#2e1e24] font-light">
              Nossa Galeria de Memórias
            </h2>
            <p className="font-script text-2xl text-[#9b495c] mt-1">
              Momentos que guardo no coração, {partnerName}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Hidden multi file input */}
            <input
              type="file"
              ref={multiFileInputRef}
              onChange={(e) => {
                if (e.target.files) {
                  handleBatchUpload(e.target.files);
                  e.target.value = '';
                }
              }}
              multiple
              accept="image/*"
              className="hidden"
            />

            {/* Quick Multi Upload Button */}
            <button
              id="batch-upload-btn"
              type="button"
              onClick={() => multiFileInputRef.current?.click()}
              disabled={isProcessing}
              title="Selecione várias fotos de uma só vez para salvar"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#eed6dc] text-[#2e1e24] hover:bg-[#faeef1] transition-all text-xs font-medium cursor-pointer shadow-2xs hover:shadow-xs disabled:opacity-60"
            >
              <UploadCloud className="w-3.5 h-3.5 text-[#9e465a]" />
              <span className="tracking-wider uppercase text-[11px]">Enviar Várias Fotos</span>
            </button>

            {/* Add single with custom text */}
            <button
              id="add-memory-photo-btn"
              type="button"
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#2e1e24] text-white hover:bg-[#462d36] transition-all text-xs font-medium cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="tracking-wider uppercase text-[11px]">Adicionar Foto</span>
            </button>

            {/* Download all photos backup */}
            {photos.length > 0 && (
              <button
                id="download-all-photos-btn"
                type="button"
                onClick={handleDownloadAll}
                title="Baixar todas as fotos para o seu aparelho"
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/70 hover:bg-white text-[#785b65] hover:text-[#2e1e24] border border-[#eed6dc] transition-all text-[11px] font-mono cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#b28e98]" />
                <span>Salvar Todas</span>
              </button>
            )}
          </div>
        </div>

        {/* Multi upload progress indicator */}
        {isProcessing && (
          <div className="mb-8 p-4 bg-white rounded-md border border-[#eed6dc] shadow-xs flex items-center gap-4">
            <Loader2 className="w-5 h-5 text-[#9e465a] animate-spin shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between text-xs font-mono text-[#785b65] mb-1">
                <span>Otimizando e salvando fotos com segurança...</span>
                {processProgress && (
                  <span>
                    {processProgress.current} de {processProgress.total}
                  </span>
                )}
              </div>
              <div className="w-full bg-[#faf5f2] rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#9e465a] h-1.5 transition-all duration-300"
                  style={{
                    width: processProgress
                      ? `${(processProgress.current / processProgress.total) * 100}%`
                      : '70%',
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Polaroid Scrapbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {photos.map((photo, index) => {
            const rot = photo.rotation ?? (index % 2 === 0 ? -1.5 : 2);
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                style={{ transform: `rotate(${rot}deg)` }}
                className="group relative cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                {/* Translucent Blush Washi Tape Graphic at Top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#f4abbb]/45 backdrop-blur-xs border border-white/60 transform -rotate-1 z-10 shadow-2xs pointer-events-none rounded-2xs" />

                {/* Polaroid Frame */}
                <div className="bg-white p-4 pb-6 rounded-xs shadow-md border border-[#eed6dc] group-hover:shadow-xl group-hover:scale-105 group-hover:rotate-0 transition-all duration-300">
                  {/* Photo Container */}
                  <div className="relative aspect-4/3 overflow-hidden bg-[#faf5f2] mb-3">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Hover eye overlay */}
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 text-white">
                      <div className="flex items-center gap-1 text-xs font-mono tracking-wider bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-xs">
                        <Eye className="w-4 h-4" />
                        <span>Ver Foto</span>
                      </div>
                    </div>
                  </div>

                  {/* Polaroid text bottom */}
                  <div className="text-center pt-1">
                    <h4 className="font-editorial text-base text-[#2e1e24] font-medium leading-tight">
                      {photo.title}
                    </h4>
                    <p className="font-handwriting text-xs text-[#8c6773] italic mt-1.5 truncate">
                      {photo.caption}
                    </p>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-[#b28e98] mt-2 block">
                      {photo.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <div
              id="photo-lightbox-modal"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedPhoto(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-2xl w-full bg-white p-4 sm:p-6 rounded-xs shadow-2xl overflow-hidden"
              >
                <button
                  id="close-lightbox-btn"
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="relative aspect-4/3 sm:aspect-16/10 bg-black/5 overflow-hidden rounded-xs">
                  <img
                    src={selectedPhoto.imageUrl}
                    alt={selectedPhoto.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="mt-4 pt-3 border-t border-[#e2e8f0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#94a3b8] uppercase">
                      {selectedPhoto.date}
                    </span>
                    <h3 className="font-editorial text-2xl text-[#1e242b]">
                      {selectedPhoto.title}
                    </h3>
                    <p className="font-garamond text-sm text-[#525c68] mt-1 italic">
                      &ldquo;{selectedPhoto.caption}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    {/* Download single photo */}
                    <button
                      type="button"
                      onClick={() =>
                        downloadPhoto(
                          selectedPhoto.imageUrl,
                          `${selectedPhoto.title.replace(/\s+/g, '_')}.jpg`
                        )
                      }
                      title="Salvar esta foto no seu aparelho"
                      className="flex items-center gap-1 px-3 py-1.5 bg-[#faf5f2] hover:bg-[#f5e8ec] text-[#2e1e24] border border-[#eed6dc] rounded-full text-xs font-mono cursor-pointer transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-[#9e465a]" />
                      <span>Salvar Foto</span>
                    </button>

                    {photos.length > 1 && (
                      <button
                        id="delete-photo-btn"
                        onClick={() => {
                          onDeletePhoto(selectedPhoto.id);
                          setSelectedPhoto(null);
                        }}
                        className="flex items-center gap-1 text-xs text-rose-500 hover:text-rose-700 font-mono cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remover</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Add Single Photo Modal */}
        <AnimatePresence>
          {isAdding && (
            <div
              id="add-photo-modal"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsAdding(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-md w-full bg-white p-6 sm:p-8 rounded-sm shadow-xl border border-[#e2e8f0]"
              >
                <button
                  onClick={() => setIsAdding(false)}
                  className="absolute top-4 right-4 p-1.5 text-[#64748b] hover:text-[#1e242b] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mb-6">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#94a3b8]">
                    NOVA MEMÓRIA
                  </span>
                  <h3 className="font-editorial text-2xl text-[#1e242b]">
                    Adicionar Foto ao Álbum
                  </h3>
                </div>

                <form onSubmit={handleSubmitNewPhoto} className="space-y-4">
                  {/* Image Upload / Preview */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#64748b] mb-1.5">
                      Foto (Upload ou URL)
                    </label>
                    <div
                      onClick={() => singleFileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#eed6dc] hover:border-[#c87687] rounded-sm p-4 text-center cursor-pointer transition-colors bg-[#faf5f2]"
                    >
                      {isProcessing ? (
                        <div className="py-6 flex flex-col items-center justify-center text-[#785b65]">
                          <Loader2 className="w-8 h-8 text-[#c87687] animate-spin mb-2" />
                          <span className="text-xs font-medium">Otimizando foto para salvar com segurança...</span>
                        </div>
                      ) : newImageUrl ? (
                        <div className="relative aspect-16/9 overflow-hidden rounded-xs">
                          <img
                            src={newImageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="py-4 flex flex-col items-center justify-center text-[#785b65]">
                          <Camera className="w-8 h-8 text-[#c87687] mb-2" />
                          <span className="text-xs font-medium">Clique para escolher do seu dispositivo</span>
                          <span className="text-[10px] text-[#b28e98] mt-1">Salva permanentemente no navegador</span>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={singleFileInputRef}
                      onChange={handleSingleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />

                    {/* Or URL input */}
                    <div className="mt-2">
                      <input
                        type="url"
                        placeholder="Ou cole a URL da imagem aqui..."
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-[#eed6dc] rounded-xs focus:outline-hidden focus:border-[#c87687]"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#785b65] mb-1">
                      Título do Momento
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Nosso Dia Inesquecível"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full text-sm px-3 py-2 border border-[#eed6dc] rounded-xs focus:outline-hidden focus:border-[#c87687]"
                    />
                  </div>

                  {/* Caption */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#785b65] mb-1">
                      Legenda / Frase Carinhosa
                    </label>
                    <textarea
                      placeholder="Ex: O dia em que rimos tanto que perdemos a hora..."
                      rows={2}
                      value={newCaption}
                      onChange={(e) => setNewCaption(e.target.value)}
                      className="w-full text-sm px-3 py-2 border border-[#eed6dc] rounded-xs focus:outline-hidden focus:border-[#c87687]"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="px-4 py-2 text-xs font-mono uppercase text-[#785b65] hover:text-[#2e1e24] cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={!newImageUrl || isProcessing}
                      className="px-5 py-2 rounded-full bg-[#2e1e24] hover:bg-[#462d36] disabled:bg-gray-300 text-white text-xs font-mono uppercase tracking-wider cursor-pointer"
                    >
                      {isProcessing ? "Processando..." : "Salvar Foto"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
