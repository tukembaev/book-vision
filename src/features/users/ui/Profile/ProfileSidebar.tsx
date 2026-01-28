import { Box, Stack } from '@chakra-ui/react';

import type { User } from '@/types/core';
import type { ProfileSection, UserProfileDashboard } from '../../mocks/userProfileDb.mock';
import { getDefaultProfileSections } from '../../mocks/userProfileDb.mock';

import { ProfileIdentityCard } from './ProfileIdentityCard.tsx';
import { ProfileNav } from './ProfileNav.tsx';

export interface ProfileSidebarProps {
  user: User;
  profile: UserProfileDashboard;
  isSelf: boolean;
  activeSection: ProfileSection;
  basePath: string;
}

export function ProfileSidebar({
  user,
  profile,
  isSelf,
  activeSection,
  basePath,
}: ProfileSidebarProps) {
  const items = getDefaultProfileSections(isSelf);

  return (
    <Box position={{ base: 'static', lg: 'sticky' }} top={{ base: 'auto', lg: '24px' }}>
      <Stack gap="4">
        <ProfileIdentityCard user={user} profile={profile} isSelf={isSelf} />
        <ProfileNav basePath={basePath} active={activeSection} items={items} />
      </Stack>
    </Box>
  );
}
