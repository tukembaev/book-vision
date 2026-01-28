import type { ComponentProps } from 'react';

import { getMockBookPlaylistsByBookId } from '../../mocks/bookPlaylistsDb.mock';
import { BookPlaylistCard } from './BookPlaylistCard';

export const bookPlaylistCardMock: ComponentProps<typeof BookPlaylistCard> = {
  playlist: getMockBookPlaylistsByBookId('1')[0],
};
