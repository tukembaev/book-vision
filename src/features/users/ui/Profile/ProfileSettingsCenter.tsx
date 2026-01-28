import { Box, Checkbox, Heading, Stack, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import type { User } from '@/types/core';

export interface ProfileSettingsCenterProps {
  user: User;
  isSelf: boolean;
}

export function ProfileSettingsCenter({ user, isSelf }: ProfileSettingsCenterProps) {
  const initialProfilePublic = user.privacy.profileVisibility === 'public';
  const initialActivityPublic = user.privacy.activityVisibility === 'public';

  const [profilePublic, setProfilePublic] = useState(initialProfilePublic);
  const [activityPublic, setActivityPublic] = useState(initialActivityPublic);

  const summary = useMemo(() => {
    return {
      profileVisibility: profilePublic ? 'public' : 'friends',
      activityVisibility: activityPublic ? 'public' : 'friends',
    };
  }, [activityPublic, profilePublic]);

  if (!isSelf) {
    return (
      <Box>
        <Heading as="h2" size="md" fontWeight="700">
          Настройки
        </Heading>
        <Text mt="2" opacity={0.8}>
          Недоступно.
        </Text>
      </Box>
    );
  }

  return (
    <Stack gap="5">
      <Box>
        <Heading as="h2" size="md" fontWeight="700">
          Настройки
        </Heading>
        <Text mt="2" opacity={0.8}>
          Приватность и видимость активности (mock).
        </Text>
      </Box>

      <Box borderWidth="1px" borderRadius="md" p="4">
        <Stack gap="3">
          <Stack gap="1">
            <Heading as="h3" size="sm" fontWeight="600">
              Приватность профиля
            </Heading>
            <Checkbox.Root
              checked={profilePublic}
              onCheckedChange={(details) => setProfilePublic(details.checked === true)}
            >
              <Checkbox.Control />
              <Checkbox.Label>Публичный профиль</Checkbox.Label>
            </Checkbox.Root>
          </Stack>

          <Stack gap="1">
            <Heading as="h3" size="sm" fontWeight="600">
              Активность
            </Heading>
            <Checkbox.Root
              checked={activityPublic}
              onCheckedChange={(details) => setActivityPublic(details.checked === true)}
            >
              <Checkbox.Control />
              <Checkbox.Label>Публичная активность</Checkbox.Label>
            </Checkbox.Root>
          </Stack>

          <Text fontSize="sm" opacity={0.75}>
            Итог: профиль {summary.profileVisibility}, активность {summary.activityVisibility}
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
}
