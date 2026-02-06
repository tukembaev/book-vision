import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout/ThreeColumnLayout';

import { getMockBookById } from '@/features/books/mocks/booksDb.mock';
import { getMockCharacterProfileById } from '../features/characters/mocks/characterProfilesDb.mock';

import { CharacterLeftSidebar } from '../features/characters/ui/CharacterProfile/CharacterLeftSidebar.tsx';
import { CharacterMain } from '../features/characters/ui/CharacterProfile/CharacterMain.tsx';
import { CharacterRightSidebar } from '../features/characters/ui/CharacterProfile/CharacterRightSidebar.tsx';

import { CharacterCommentsList } from '../features/characters/ui/CharacterProfile/CharacterCommentsList.tsx';

export default function CharacterPage() {
  const { characterId } = useParams();

  if (!characterId) {
    return null;
  }

  const character = getMockCharacterProfileById(characterId);

  if (!character) {
    return (
      <Box>
        <Heading as="h2" size="md" fontWeight="600">
          Персонаж не найден
        </Heading>
        <Text mt="2" opacity={0.8}>
          Нет персонажа с id: {characterId}
        </Text>
      </Box>
    );
  }

  const book = getMockBookById(character.bookId);

  return (
    <ThreeColumnLayout
      left={<CharacterLeftSidebar character={character} book={book} />}
      center={
        <Stack gap="6">
          <CharacterMain character={character} />

          <Box>
            <Heading as="h3" size="sm" fontWeight="600">
              Комментарии
            </Heading>
            <Text mt="2" opacity={0.8}>
              Простые комментарии (mock). Вложенность позже.
            </Text>
          </Box>

          <CharacterCommentsList characterId={character.id} />
        </Stack>
      }
      right={<CharacterRightSidebar character={character} />}
    />
  );
}
