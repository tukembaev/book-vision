import type { CommentListItemProps } from './CommentListItem';
import { mockCommentsDb } from '../../mocks/commentsDb.mock';

export const commentListItemMock: CommentListItemProps = {
  comment: mockCommentsDb[0],
};
