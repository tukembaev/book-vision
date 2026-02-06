import { Box, Heading, Text, Tabs, Image } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout/ThreeColumnLayout';
import { getMockUserById } from '../features/users/mocks/usersDb.mock';

import {
  getMockUserProfileByUserId,
  getDefaultProfileSections,
} from '../features/users/mocks/userProfileDb.mock';

import { ProfileSidebar } from '../features/users/ui/Profile/ProfileSidebar.tsx';

import { ProfileLibraryV2Center } from '../features/users/ui/Profile/ProfileLibraryV2Center.tsx';
import { ProfileStatsCenter } from '../features/users/ui/Profile/ProfileStatsCenter.tsx';
import { ProfileActivityCenter } from '../features/users/ui/Profile/ProfileActivityCenter.tsx';
import { ProfileHelpCenter } from '../features/users/ui/Profile/ProfileHelpCenter.tsx';
import { ProfileChallengesCenter } from '../features/users/ui/Profile/ProfileChallengesCenter.tsx';

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
    <Box minHeight="100vh">
      <ThreeColumnLayout
        left={<ProfileSidebar user={user} profile={profile} isSelf={isSelf} />}
        center={
          <Box pr={{ base: 0, lg: 1 }}>
            <Box 
              borderRadius="lg" 
              mb={6}
              position="relative"
              overflow="hidden"
              boxShadow="sm"
            >
              <Image 
                src="https://e1.pxfuel.com/desktop-wallpaper/291/910/desktop-wallpaper-steam-workshop-jojo-s-bizarre-addons-za-warudo.jpg" 
                alt="Banner"
                width="100%" 
                height="200px" 
                objectFit="cover"
              />
            </Box>
            <Tabs.Root defaultValue={tabs[0]?.key ?? 'library'} variant="subtle" justify="center">
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
                  {t.key === 'library' ? (
                    <ProfileLibraryV2Center />
                  ) : t.key === 'stats' ? (
                    <ProfileStatsCenter />
                  ) : t.key === 'activity' ? (
                    <ProfileActivityCenter userId={userId} profile={profile} />
                  ) : t.key === 'help' ? (
                    <ProfileHelpCenter profile={profile} />
                  ) : t.key === 'challenges' ? (
                    <ProfileChallengesCenter />
                  ) : (
                    <ProfileLibraryV2Center />
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
