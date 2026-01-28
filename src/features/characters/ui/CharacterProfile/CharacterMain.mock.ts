import type { ComponentProps } from 'react';

import { getMockCharacterProfileById } from '../../mocks/characterProfilesDb.mock';
import { CharacterMain } from './CharacterMain.tsx';

export const characterMainMock: ComponentProps<typeof CharacterMain> = {
  character: getMockCharacterProfileById('c1')!,
};
