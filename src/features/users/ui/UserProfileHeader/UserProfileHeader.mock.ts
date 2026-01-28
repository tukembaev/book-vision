import type { UserProfileHeaderProps } from './UserProfileHeader.tsx';
import { mockUsersDb } from '../../mocks/usersDb.mock';

export const userProfileHeaderMock: UserProfileHeaderProps = {
  user: mockUsersDb[0],
};
