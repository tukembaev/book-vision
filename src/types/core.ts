export type UserRole = 'user' | 'moderator' | 'admin';

export interface User {
  id: string;
  username: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;

  stats: {
    booksRead: number;
    reviewsCount: number;
    likesReceived: number;
  };

  privacy: {
    profileVisibility: 'public' | 'friends';
    activityVisibility: 'public' | 'friends';
  };
}

export interface Book {
  id: string;
  title: string;
  originalTitle?: string;
  author: string;
  year?: number;

  description: string;
  coverUrl?: string;

  pagesCount: number;

  status: {
    verified: boolean;
    verificationType?: 'AI' | 'Community';
  };

  createdBy: string;
  createdAt: string;

  tags: string[];

  ratings: {
    average: number;
    count: number;
  };
}

export interface BookPart {
  id: string;
  bookId: string;

  title: string;
  order: number;

  pageStart?: number;
  pageEnd?: number;

  moodTags: string[];
  averageRating?: number;
}

export interface Character {
  id: string;
  bookId: string;

  name: string;
  description: string;

  source: 'wiki' | 'community';
  verified: boolean;

  popularityScore?: number;
}

export interface Comment {
  id: string;
  userId: string;
  bookId: string;
  partId?: string;

  text: string;
  likes: number;

  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  bookId: string;

  rating: number;
  text: string;

  likedCharacters?: string[];
  dislikedCharacters?: string[];

  bestParts?: string[];

  createdAt: string;
}

export interface Playlist {
  id: string;

  title: string;
  moodTag: string;

  tracks: string[];
  createdBy: 'system' | 'user';
}

export interface ReadBookForm {
  bookId: string;

  favoriteCharacter?: string;
  dislikedCharacter?: string;

  bestPartId?: string;

  rating: number;
  thoughts?: string;
}

export interface Challenge {
  id: string;

  title: string;
  description: string;

  type: 'books' | 'reviews';
  targetCount: number;

  rewardPoints: number;
}
