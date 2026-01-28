import type { ReviewListItemProps } from './ReviewListItem.tsx';
import { mockReviewsDb } from '../../mocks/reviewsDb.mock';

export const reviewListItemMock: ReviewListItemProps = {
  review: mockReviewsDb[0],
};
