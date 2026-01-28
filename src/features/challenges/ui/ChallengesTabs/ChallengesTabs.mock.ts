import type { ComponentProps } from 'react';

import { ChallengesTabs } from './ChallengesTabs.tsx';

export const challengesTabsMock: ComponentProps<typeof ChallengesTabs> = {
  value: 'active',
  onChange: () => undefined,
};
