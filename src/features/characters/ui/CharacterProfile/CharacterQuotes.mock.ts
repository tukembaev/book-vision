import type { ComponentProps } from 'react';

import { getMockCharacterProfileById } from '../../mocks/characterProfilesDb.mock';
import { CharacterQuotes } from './CharacterQuotes.tsx';

const c = getMockCharacterProfileById('c1')!;

export const characterQuotesMock: ComponentProps<typeof CharacterQuotes> = {
  noSpoilers: c.quotesNoSpoilers,
  spoilers: c.quotesSpoilers,
};
