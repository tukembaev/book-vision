import { Stack } from '@chakra-ui/react';

import type { CharacterCatalogEntry } from '../../mocks/characterProfilesDb.mock';
import { CharactersCatalogListItem } from './CharactersCatalogListItem.tsx';

export interface CharactersCatalogListProps {
  entries: CharacterCatalogEntry[];
}

export function CharactersCatalogList({ entries }: CharactersCatalogListProps) {
  return (
    <Stack gap="3">
      {entries.map((c) => (
        <CharactersCatalogListItem key={c.id} entry={c} />
      ))}
    </Stack>
  );
}
