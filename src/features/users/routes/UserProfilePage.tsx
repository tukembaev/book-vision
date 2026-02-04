import { Box, Heading, Text, Tabs, Image } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout';
import { getMockUserById } from '../mocks/usersDb.mock';

import {
  getMockUserProfileByUserId,
  getDefaultProfileSections,
} from '../mocks/userProfileDb.mock';

import { ProfileSidebar } from '../ui/Profile/ProfileSidebar.tsx';
import { ProfileLibraryCenter } from '../ui/Profile/ProfileLibraryCenter.tsx';
import { ProfileLibraryV2Center } from '../ui/Profile/ProfileLibraryV2Center.tsx';
import { ProfileStatsCenter } from '../ui/Profile/ProfileStatsCenter.tsx';
import { ProfileActivityCenter } from '../ui/Profile/ProfileActivityCenter.tsx';
import { ProfileHelpCenter } from '../ui/Profile/ProfileHelpCenter.tsx';
import { ProfileChallengesCenter } from '../ui/Profile/ProfileChallengesCenter.tsx';

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
                src="https://t4.ftcdn.net/jpg/03/90/37/71/360_F_390377167_NYd4Zi29xUAxEFDcVwX8SYSbagv4At8N.jpg" 
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
                    <ProfileLibraryCenter profile={profile} />
                  ) : t.key === 'libraryV2' ? (
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
                    <ProfileLibraryCenter profile={profile} />
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
