import { Stack } from '@chakra-ui/react';

import type { BookPlaylistLink } from '../../mocks/bookPlaylistsDb.mock';
import { BookPlaylistCard } from './BookPlaylistCard.tsx';

export interface BookPlaylistsListProps {
  playlists: BookPlaylistLink[];
}

export function BookPlaylistsList({ playlists }: BookPlaylistsListProps) {
  return (
    <Stack gap="3">
      {playlists.map((p) => (
        <BookPlaylistCard key={p.id} playlist={p} />
      ))}
    </Stack>
  );
}
