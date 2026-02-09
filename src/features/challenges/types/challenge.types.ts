export type BookLength = 'short' | 'medium' | 'long' | 'very-long';

export interface ChallengeBook {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  pagesCount: number;
  length: BookLength;
  isRead: boolean;
}

export interface ChallengeSection {
  id: string;
  title: string;
  books: ChallengeBook[];
}

export interface ChallengeParticipant {
  id: string;
  username: string;
  avatarUrl?: string;
  booksRead: number;
  joinedAt: string;
}

export interface ChallengeCardData {
  id: string;
  title: string;
  description: string;
  coverGradient: string;
  iconEmoji: string;
  sectionsCount: number;
  booksCount: number;
  createdBy: string;
  participantsCount: number;
}

export interface MyChallengeData extends ChallengeCardData {
  progressCount: number;
  totalCount: number;
}

export interface ChallengeDetail {
  id: string;
  title: string;
  description: string;
  coverGradient: string;
  iconEmoji: string;
  sections: ChallengeSection[];
  participants: ChallengeParticipant[];
  createdBy: string;
  createdAt: string;
  totalBooks: number;
  readBooks: number;
}
