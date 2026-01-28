import type { ComponentProps } from 'react';

import { getMockCharacterProfileById } from '../../mocks/characterProfilesDb.mock';
import { getMockBookById } from '@/features/books/mocks/booksDb.mock';
import { CharacterLeftSidebar } from './CharacterLeftSidebar.tsx';

export const characterLeftSidebarMock: ComponentProps<typeof CharacterLeftSidebar> = {
  character: getMockCharacterProfileById('c1')!,
  book: getMockBookById('1'),
};
