import type { CharactersListProps } from './CharactersList';
import { getMockBookCharactersByBookId } from '../../mocks/charactersDb.mock';

export const charactersListMock: CharactersListProps = {
  characters: getMockBookCharactersByBookId('1'),
};
