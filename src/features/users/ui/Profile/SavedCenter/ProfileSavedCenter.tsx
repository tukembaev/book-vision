import { Box, Heading, Stack, Tabs, Text } from '@chakra-ui/react';



import { mockSavedCollections, mockSavedDebates, mockSavedItems } from './savedCenter.mock';
import { SavedCollectionCard } from './SavedCollectionCard';
import { SavedDebateCard } from './SavedDebateCard';
import { SavedItemCard } from './SavedItemCard';

type SavedTabKey = 'collections' | 'debates' | 'saved';

const savedTabs: Array<{ key: SavedTabKey; title: string }> = [
  { key: 'collections', title: 'Коллекции' },
  { key: 'debates', title: 'Дебаты' },
  { key: 'saved', title: 'Сохранённое' },
];

export function ProfileSavedCenter() {
  return (
    <Stack gap="5">
      <Box>
        <Heading as="h2" size="md" fontWeight="700">
          Избранное
        </Heading>
        <Text mt="1" fontSize="sm" opacity={0.6}>
          Коллекции, дебаты и сохранённые материалы
        </Text>
      </Box>

      <Tabs.Root defaultValue="collections" variant="line">
        <Tabs.List overflowX="auto" overflowY="hidden">
          {savedTabs.map((t) => (
            <Tabs.Trigger key={t.key} value={t.key}>
              {t.title}
            </Tabs.Trigger>
          ))}
          <Tabs.Indicator />
        </Tabs.List>

        <Tabs.Content value="collections" pt="4">
          {mockSavedCollections.length === 0 ? (
            <Text opacity={0.5} fontSize="sm">Нет коллекций.</Text>
          ) : (
            <Stack gap="3">
              {mockSavedCollections.map((c) => (
                <SavedCollectionCard key={c.id} collection={c} />
              ))}
            </Stack>
          )}
        </Tabs.Content>

        <Tabs.Content value="debates" pt="4">
          {mockSavedDebates.length === 0 ? (
            <Text opacity={0.5} fontSize="sm">Нет дебатов.</Text>
          ) : (
            <Stack gap="3">
              {mockSavedDebates.map((d) => (
                <SavedDebateCard key={d.id} debate={d} />
              ))}
            </Stack>
          )}
        </Tabs.Content>

        <Tabs.Content value="saved" pt="4">
          {mockSavedItems.length === 0 ? (
            <Text opacity={0.5} fontSize="sm">Нет сохранённых элементов.</Text>
          ) : (
            <Stack gap="3">
              {mockSavedItems.map((item) => (
                <SavedItemCard key={item.id} item={item} />
              ))}
            </Stack>
          )}
        </Tabs.Content>
      </Tabs.Root>
    </Stack>
  );
}
