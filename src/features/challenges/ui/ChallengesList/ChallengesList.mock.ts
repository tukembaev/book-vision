import type { ComponentProps } from 'react';

import { getMockChallenges } from '../../mocks/challengesDb.mock';
import { ChallengesList } from './ChallengesList.tsx';

export const challengesListMock: ComponentProps<typeof ChallengesList> = {
  challenges: getMockChallenges(),
};
