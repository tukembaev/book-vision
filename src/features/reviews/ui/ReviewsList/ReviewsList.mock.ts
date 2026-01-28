import type { ReviewsListProps } from './ReviewsList.tsx';
import { getMockBookReviewsByBookId } from '../../mocks/reviewsDb.mock';

export const reviewsListMock: ReviewsListProps = {
  reviews: getMockBookReviewsByBookId('1'),
};
