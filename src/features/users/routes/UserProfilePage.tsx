import { Box, Heading, Text, Tabs } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout';
import { getMockUserById } from '../mocks/usersDb.mock';

import {
  getMockUserProfileByUserId,
  getDefaultProfileSections,
} from '../mocks/userProfileDb.mock';

import { ProfileSidebar } from '../ui/Profile/ProfileSidebar.tsx';
import { ProfileOverviewCenter } from '../ui/Profile/ProfileOverviewCenter.tsx';
import { ProfileHelpCenter } from '../ui/Profile/ProfileHelpCenter.tsx';
import { ProfileReadCenter } from '../ui/Profile/ProfileReadCenter.tsx';
import { ProfileReviewsCenter } from '../ui/Profile/ProfileReviewsCenter.tsx';
import { ProfileChallengesCenter } from '../ui/Profile/ProfileChallengesCenter.tsx';
import { ProfileSettingsCenter } from '../ui/Profile/ProfileSettingsCenter.tsx';

export default function UserProfilePage() {
  const { userId } = useParams();

  if (!userId) {
    return null;
  }

  const user = getMockUserById(userId);
  const profile = getMockUserProfileByUserId(userId);

  const currentUserId = 'u1';
  const isSelf = userId === currentUserId;

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

  const tabs = getDefaultProfileSections(isSelf);

  return (
    <Box height={{ base: 'auto', lg: 'calc(100vh - 96px)' }} overflow={{ base: 'visible', lg: 'hidden' }}>
      <ThreeColumnLayout
        left={<ProfileSidebar user={user} profile={profile} isSelf={isSelf} />}
        center={
          <Box height={{ base: 'auto', lg: '100%' }} overflowY={{ base: 'visible', lg: 'auto' }} pr={{ base: 0, lg: 1 }}>
            <Tabs.Root defaultValue={tabs[0]?.key ?? 'overview'} variant="line" justify="center">
              <Tabs.List>
                {tabs.map((t) => (
                  <Tabs.Trigger key={t.key} value={t.key}>
                    {t.title}
                  </Tabs.Trigger>
                ))}
                <Tabs.Indicator />
              </Tabs.List>

              {tabs.map((t) => (
                <Tabs.Content key={t.key} value={t.key} pt="4">
                  {t.key === 'help' ? (
                    <ProfileHelpCenter profile={profile} />
                  ) : t.key === 'read' ? (
                    <ProfileReadCenter profile={profile} />
                  ) : t.key === 'reviews' ? (
                    <ProfileReviewsCenter userId={userId} />
                  ) : t.key === 'challenges' ? (
                    <ProfileChallengesCenter />
                  ) : t.key === 'settings' ? (
                    <ProfileSettingsCenter user={user} isSelf={isSelf} />
                  ) : (
                    <ProfileOverviewCenter profile={profile} />
                  )}
                </Tabs.Content>
              ))}
            </Tabs.Root>
          </Box>
        }
        right={null}
      />
    </Box>
  );
}
