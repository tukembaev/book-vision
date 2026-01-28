import type { ComponentProps } from 'react';

import { getMockCharactersCatalogEntries } from '../../mocks/characterProfilesDb.mock';
import { CharactersCatalogList } from './CharactersCatalogList.tsx';

export const charactersCatalogListMock: ComponentProps<typeof CharactersCatalogList> = {
  entries: getMockCharactersCatalogEntries(),
};
