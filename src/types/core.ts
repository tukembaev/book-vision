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

  genres?: string[];
  ageRating?: '6+' | '12+' | '16+' | '18+';
  authorCountry?: string;

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
  
  parentCommentId?: string;
  replyToUserId?: string;
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

export type FeedItemType = 'review' | 'comment' | 'word' | 'quote' | 'help';

export interface FeedItem {
  id: string;
  type: FeedItemType;
  userId: string;
  createdAt: string;

  title: string;
  text: string;

  bookId?: string;
  characterId?: string;
}

export interface Quote {
  id: string;
  userId: string;
  bookId: string;
  partId?: string;
  text: string;
  createdAt: string;
}

export interface CharacterIllustration {
  id: string;
  imageUrl?: string;
  authorName: string;
}

export interface CharacterProfile {
  id: string;
  bookId: string;
  name: string;
  aliases: string[];

  imageUrl?: string;

  stats: {
    age?: string;
    height?: string;
    weight?: string;
    socialStatus?: string;
  };

  illustrations: CharacterIllustration[];

  descriptionNoSpoilers: string;
  descriptionSpoilers: string;

  quotesNoSpoilers: string[];
  quotesSpoilers: string[];

  favoritedByUserIds: string[];
}

export type ArticleType =
  | 'shouldRead'
  | 'analysis'
  | 'review'
  | 'collection'
  | 'guide'
  | 'comparison'
  | 'discussion';

export type ArticleReadiness = 'must' | 'maybe' | 'no';

export type ArticleContentBlock =
  | {
      type: 'h2' | 'h3';
      text: string;
      id?: string;
    }
  | {
      type: 'p' | 'quote';
      text: string;
    };

export interface Article {
  id: string;
  title: string;
  type: ArticleType;

  authorId: string;
  bookId: string;

  excerpt: string;
  createdAt: string;

  likes: number;
  views: number;

  readingMinutes?: number;

  status?: {
    verified: boolean;
    verificationType?: 'AI' | 'Community';
  };

  noSpoilers: boolean;
  shouldRead?: {
    readiness: ArticleReadiness;
  };

  content?: ArticleContentBlock[];
}
