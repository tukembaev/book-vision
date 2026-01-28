import type { CharacterListItemProps } from './CharacterListItem.tsx';
import { mockCharactersDb } from '../../mocks/charactersDb.mock';

export const characterListItemMock: CharacterListItemProps = {
  character: mockCharactersDb[0],
};
