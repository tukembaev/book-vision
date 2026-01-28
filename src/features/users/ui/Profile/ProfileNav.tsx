import { Box, Stack, Text } from '@chakra-ui/react';

import { AppLink } from '@/components/navigation/AppLink.tsx';
import type { ProfileSection } from '../../mocks/userProfileDb.mock';

export interface ProfileNavItem {
  key: ProfileSection;
  title: string;
}

export interface ProfileNavProps {
  basePath: string;
  active: ProfileSection;
  items: ProfileNavItem[];
}

export function ProfileNav({ basePath, active, items }: ProfileNavProps) {
  return (
    <Box borderWidth="1px" borderRadius="md" p="3">
      <Stack gap="1">
        {items.map((item) => {
          const isActive = item.key === active;
          const to = `${basePath}?section=${item.key}`;

          return (
            <AppLink
              key={item.key}
              to={to}
              px="3"
              py="2"
              borderRadius="md"
              bg={isActive ? 'gray.100' : 'transparent'}
              _hover={{ textDecoration: 'none', bg: 'gray.50' }}
              fontWeight={isActive ? '700' : '500'}
            >
              <Text>{item.title}</Text>
            </AppLink>
          );
        })}
      </Stack>
    </Box>
  );
}
