import type { ComponentProps } from 'react';

import { getMockCharactersCatalogEntries } from '../../mocks/characterProfilesDb.mock';
import { CharactersCatalogListItem } from './CharactersCatalogListItem.tsx';

export const charactersCatalogListItemMock: ComponentProps<typeof CharactersCatalogListItem> = {
  entry: getMockCharactersCatalogEntries()[0],
};
