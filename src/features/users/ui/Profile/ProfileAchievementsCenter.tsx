import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import type { UserAchievement, UserProfileDashboard } from '../../mocks/userProfileDb.mock';

type RarityFilter = 'all' | UserAchievement['rarity'];

export interface ProfileAchievementsCenterProps {
  profile: UserProfileDashboard;
}

export function ProfileAchievementsCenter({ profile }: ProfileAchievementsCenterProps) {
  const [rarity, setRarity] = useState<RarityFilter>('all');

  const items = useMemo(() => {
    const arr = [...profile.achievements].sort((a, b) => (a.earnedAt < b.earnedAt ? 1 : -1));
    if (rarity === 'all') {
      return arr;
    }
    return arr.filter((a) => a.rarity === rarity);
  }, [profile.achievements, rarity]);

  return (
    <Stack gap="5">
      <Box>
        <Heading as="h2" size="md" fontWeight="700">
          Достижения
        </Heading>
        <Text mt="2" opacity={0.8}>
          Карточки достижений с фильтром по редкости.
        </Text>
      </Box>

      <Flex gap="2" wrap="wrap">
        <Button size="sm" variant={rarity === 'all' ? 'solid' : 'outline'} onClick={() => setRarity('all')}>
          все
        </Button>
        <Button size="sm" variant={rarity === 'common' ? 'solid' : 'outline'} onClick={() => setRarity('common')}>
          common
        </Button>
        <Button size="sm" variant={rarity === 'rare' ? 'solid' : 'outline'} onClick={() => setRarity('rare')}>
          rare
        </Button>
        <Button size="sm" variant={rarity === 'epic' ? 'solid' : 'outline'} onClick={() => setRarity('epic')}>
          epic
        </Button>
      </Flex>

      {items.length === 0 ? (
        <Text opacity={0.8}>Пока нет достижений (mock).</Text>
      ) : (
        <Stack gap="3">
          {items.map((a) => (
            <Box key={a.id} borderWidth="1px" borderRadius="md" p="3">
              <Heading as="h3" size="sm" fontWeight="600">
                {a.title}
              </Heading>
              <Text mt="1" opacity={0.85}>
                {a.description}
              </Text>
              <Text mt="2" fontSize="sm" opacity={0.7}>
                Редкость: {a.rarity} · {a.earnedAt}
              </Text>
            </Box>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
