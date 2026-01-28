import type { ComponentProps } from 'react';

import { getMockChallenges } from '../../mocks/challengesDb.mock';
import { ChallengeCard } from './ChallengeCard.tsx';

export const challengeCardMock: ComponentProps<typeof ChallengeCard> = {
  challenge: getMockChallenges()[0],
};
