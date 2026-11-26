export interface MemoryPhoto {
  id: string;
  title: string;
  date: string;
  location?: string;
  caption: string;
  imageUrl: string;
  rotation?: number;
  imagePositionClass?: string;
}

export interface TimelineMilestone {
  id: string;
  chapter: string;
  date: string;
  title: string;
  description: string;
  quote?: string;
  tag?: string;
}

export interface LoveReason {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export interface CoupleProfile {
  partnerName: string;
  userName: string;
  startDate: string; // YYYY-MM-DD
  songTitle: string;
  songArtist: string;
  secretLetter: string;
  customQuote: string;
  heroNumber: string;
  anniversaryTitle: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroTagline?: string;
  storyTitle?: string;
  heroPhoto?: string;
  spotifyUrl?: string;
}
