import type { ComponentProps } from 'react';

import { getMockCharacterProfileById } from '../../mocks/characterProfilesDb.mock';
import { CharacterRightSidebar } from './CharacterRightSidebar.tsx';

export const characterRightSidebarMock: ComponentProps<typeof CharacterRightSidebar> = {
  character: getMockCharacterProfileById('c1')!,
};
