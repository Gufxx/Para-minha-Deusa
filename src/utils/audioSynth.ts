/**
 * Audio player for "Baby Be Mine" by Michael Jackson.
 * Handles HTMLAudioElement playback with loop, fallback sources, and event subscriptions.
 */

class RomanticTrackPlayer {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.4;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private primarySrc = '/audio/baby_be_mine.mp3';
  private secondarySrc = '/audio/baby_be_mine.m4a';
  private remoteFallback = 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b3/9c/8b/b39c8b6b-7a9f-8944-25c2-1348eaadeaac/mzaf_2663676543764471086.plus.aac.p.m4a';

  public subscribe(listener: (playing: boolean) => void) {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.isPlaying));
  }

  private getAudio(): HTMLAudioElement | null {
    if (!this.audio && typeof window !== 'undefined') {
      this.audio = new Audio();
      this.audio.src = this.primarySrc;
      this.audio.loop = true;
      this.audio.volume = this.volume;
      this.audio.preload = 'auto';

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notifyListeners();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notifyListeners();
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notifyListeners();
      });

      this.audio.addEventListener('error', () => {
        console.warn('Audio source error, attempting secondary fallback...');
        if (this.audio) {
          if (this.audio.src.includes('.mp3')) {
            this.audio.src = this.secondarySrc;
            if (this.isPlaying) this.audio.play().catch(() => {});
          } else if (this.audio.src.includes('.m4a')) {
            this.audio.src = this.remoteFallback;
            if (this.isPlaying) this.audio.play().catch(() => {});
          }
        }
      });
    }
    return this.audio;
  }

  public play() {
    try {
      const el = this.getAudio();
      if (el) {
        el.volume = this.volume;
        const playPromise = el.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.isPlaying = true;
              this.notifyListeners();
            })
            .catch((err) => {
              console.warn('Playback requires user interaction:', err);
              this.isPlaying = false;
              this.notifyListeners();
            });
        }
      }
    } catch (e) {
      console.error('Audio play error', e);
    }
  }

  public pause() {
    try {
      if (this.audio) {
        this.audio.pause();
      }
    } catch (e) {
      console.error('Audio pause error', e);
    }
    this.isPlaying = false;
    this.notifyListeners();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }
}

export const romanticAudio = new RomanticTrackPlayer();
