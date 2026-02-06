import type { BookDiscussionProps } from './BookDiscussion';
import { mockCommentThreads } from '@/features/comments/mocks/commentsThread.mock';

export const bookDiscussionMock: BookDiscussionProps = {
  comments: mockCommentThreads,
};
