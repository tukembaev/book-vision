import type { ReviewsListProps } from './ReviewsList';
import { getMockBookReviewsByBookId } from '../../mocks/reviewsDb.mock';

export const reviewsListMock: ReviewsListProps = {
  reviews: getMockBookReviewsByBookId('1'),
};
