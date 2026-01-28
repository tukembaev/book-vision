import type { Challenge } from '@/types/core';

export type ChallengeStatus = 'active' | 'completed';

export interface ChallengeProgress extends Challenge {
  status: ChallengeStatus;
  progressCount: number;
}

export const mockChallengesDb: ChallengeProgress[] = [
  {
    id: 'ch-1',
    title: 'Прочитать 5 книг',
    description: 'Осознанно дочитай пять книг и закрепи результат формой «Я прочёл».',
    type: 'books',
    targetCount: 5,
    rewardPoints: 100,
    status: 'active',
    progressCount: 2,
  },
  {
    id: 'ch-2',
    title: 'Оставить 10 отзывов',
    description: 'Пиши коротко и по делу: что запомнилось и почему.',
    type: 'reviews',
    targetCount: 10,
    rewardPoints: 150,
    status: 'active',
    progressCount: 4,
  },
  {
    id: 'ch-3',
    title: 'Неделя чтения',
    description: '7 дней подряд отмечай прогресс чтения (мок-версия: прогресс вручную).',
    type: 'books',
    targetCount: 7,
    rewardPoints: 70,
    status: 'completed',
    progressCount: 7,
  },
];

export function getMockChallenges() {
  return [...mockChallengesDb];
}

export function getMockChallengesByStatus(status: ChallengeStatus) {
  return getMockChallenges().filter((c) => c.status === status);
}
