import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout';
import { getMockUserById } from '../mocks/usersDb.mock';

import { UserProfileHeader } from '../ui/UserProfileHeader/UserProfileHeader';
import { UserStatsCard } from '../ui/UserStatsCard/UserStatsCard';

export default function UserProfilePage() {
  const { userId } = useParams();

  if (!userId) {
    return null;
  }

  const user = getMockUserById(userId);

  if (!user) {
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
        <Box>
          <Heading as="h3" size="sm" fontWeight="600">
            Навигация
          </Heading>
          <Text mt="2" opacity={0.8}>
            В будущем: друзья, активность, подборки.
          </Text>
        </Box>
      }
      center={
        <Stack gap="4">
          <UserProfileHeader user={user} />

          <Box>
            <Heading as="h3" size="sm" fontWeight="600">
              Прочитанные книги
            </Heading>
            <Text mt="2" opacity={0.8}>
              Заготовка. Позже добавим историю чтения (start/end), streak и аналитику.
            </Text>
          </Box>
        </Stack>
      }
      right={<UserStatsCard user={user} />}
    />
  );
}
