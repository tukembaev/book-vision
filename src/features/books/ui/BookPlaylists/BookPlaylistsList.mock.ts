import type { ComponentProps } from 'react';

import { getMockBookPlaylistsByBookId } from '../../mocks/bookPlaylistsDb.mock';
import { BookPlaylistsList } from './BookPlaylistsList';

export const bookPlaylistsListMock: ComponentProps<typeof BookPlaylistsList> = {
  playlists: getMockBookPlaylistsByBookId('1'),
};
