import { Stack } from '@chakra-ui/react';

import { getMockCharacterComments } from '../../mocks/characterCommentsDb.mock';
import { CharacterCommentListItem } from './CharacterCommentListItem.tsx';

export interface CharacterCommentsListProps {
  characterId: string;
}

export function CharacterCommentsList({ characterId }: CharacterCommentsListProps) {
  const comments = getMockCharacterComments(characterId);

  return (
    <Stack gap="3">
      {comments.map((c) => (
        <CharacterCommentListItem key={c.id} comment={c} />
      ))}
    </Stack>
  );
}
