import type { ComponentProps } from 'react';

import { getMockCharacterComments } from '../../mocks/characterCommentsDb.mock';
import { CharacterCommentListItem } from './CharacterCommentListItem.tsx';

export const characterCommentListItemMock: ComponentProps<typeof CharacterCommentListItem> = {
  comment: getMockCharacterComments('c1')[0],
};
