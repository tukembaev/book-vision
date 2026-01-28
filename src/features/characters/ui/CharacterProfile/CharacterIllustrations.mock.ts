import type { ComponentProps } from 'react';

import { getMockCharacterProfileById } from '../../mocks/characterProfilesDb.mock';
import { CharacterIllustrations } from './CharacterIllustrations.tsx';

export const characterIllustrationsMock: ComponentProps<typeof CharacterIllustrations> = {
  illustrations: getMockCharacterProfileById('c1')!.illustrations,
};
