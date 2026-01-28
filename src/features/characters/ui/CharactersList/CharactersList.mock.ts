import type { CharactersListProps } from './CharactersList.tsx';
import { getMockBookCharactersByBookId } from '../../mocks/charactersDb.mock';

export const charactersListMock: CharactersListProps = {
  characters: getMockBookCharactersByBookId('1'),
};
