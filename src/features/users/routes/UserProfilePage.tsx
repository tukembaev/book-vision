import { Box, Heading, Text } from '@chakra-ui/react';
import { useParams, useSearchParams } from 'react-router-dom';

import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout';
import { getMockUserById } from '../mocks/usersDb.mock';

import {
  getMockUserProfileByUserId,
  getProfileSectionFromSearch,
  isProfileSectionVisible,
  type ProfileSection,
} from '../mocks/userProfileDb.mock';

import { ProfileSidebar } from '../ui/Profile/ProfileSidebar.tsx';
import { ProfileOverviewCenter } from '../ui/Profile/ProfileOverviewCenter.tsx';
import { ProfileHelpCenter } from '../ui/Profile/ProfileHelpCenter.tsx';
import { ProfileReadCenter } from '../ui/Profile/ProfileReadCenter.tsx';
import { ProfileReviewsCenter } from '../ui/Profile/ProfileReviewsCenter.tsx';
import { ProfileAchievementsCenter } from '../ui/Profile/ProfileAchievementsCenter.tsx';
import { ProfileChallengesCenter } from '../ui/Profile/ProfileChallengesCenter.tsx';
import { ProfileFavoritesCenter } from '../ui/Profile/ProfileFavoritesCenter.tsx';
import { ProfileSettingsCenter } from '../ui/Profile/ProfileSettingsCenter.tsx';
import { ProfileRightSidebar } from '../ui/Profile/ProfileRightSidebar.tsx';

export default function UserProfilePage() {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();

  if (!userId) {
    return null;
  }

  const user = getMockUserById(userId);
  const profile = getMockUserProfileByUserId(userId);

  const currentUserId = 'u1';
  const isSelf = userId === currentUserId;

  const rawSection: ProfileSection = getProfileSectionFromSearch(searchParams.get('section'));
  const section: ProfileSection = isProfileSectionVisible(rawSection, isSelf) ? rawSection : 'overview';

  if (!user || !profile) {
    return (
      <Box>
        <Heading as="h2" size="md" fontWeight="600">
          Пользователь не найден
        </Heading>
        <Text mt="2" opacity={0.8}>
          Нет пользователя с id: {userId}
        </Text>
      </Box>
    );
  }

  return (
    <ThreeColumnLayout
      left={
        <ProfileSidebar
          user={user}
          profile={profile}
          isSelf={isSelf}
          activeSection={section}
          basePath={`/users/${userId}`}
        />
      }
      center={
        section === 'help' ? (
          <ProfileHelpCenter profile={profile} />
        ) : section === 'read' ? (
          <ProfileReadCenter profile={profile} />
        ) : section === 'reviews' ? (
          <ProfileReviewsCenter userId={userId} />
        ) : section === 'achievements' ? (
          <ProfileAchievementsCenter profile={profile} />
        ) : section === 'challenges' ? (
          <ProfileChallengesCenter />
        ) : section === 'favorites' ? (
          <ProfileFavoritesCenter profile={profile} />
        ) : section === 'settings' ? (
          <ProfileSettingsCenter user={user} isSelf={isSelf} />
        ) : (
          <ProfileOverviewCenter user={user} profile={profile} />
        )
      }
      right={<ProfileRightSidebar section={section} profile={profile} user={user} />}
    />
  );
}
