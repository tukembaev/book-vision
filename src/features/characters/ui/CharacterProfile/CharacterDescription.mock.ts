import type { ComponentProps } from 'react';

import { getMockCharacterProfileById } from '../../mocks/characterProfilesDb.mock';
import { CharacterDescription } from './CharacterDescription.tsx';

const c = getMockCharacterProfileById('c1')!;

export const characterDescriptionMock: ComponentProps<typeof CharacterDescription> = {
  noSpoilers: c.descriptionNoSpoilers,
  spoilers: c.descriptionSpoilers,
};
