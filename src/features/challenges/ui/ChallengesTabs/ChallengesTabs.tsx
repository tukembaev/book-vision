import { Button, Flex } from '@chakra-ui/react';

import type { ChallengeStatus } from '../../mocks/challengesDb.mock';

export interface ChallengesTabsProps {
  value: ChallengeStatus;
  onChange: (value: ChallengeStatus) => void;
}

export function ChallengesTabs({ value, onChange }: ChallengesTabsProps) {
  return (
    <Flex gap="2" wrap="wrap">
      <Button
        size="sm"
        variant={value === 'active' ? 'solid' : 'outline'}
        onClick={() => onChange('active')}
      >
        активные
      </Button>
      <Button
        size="sm"
        variant={value === 'completed' ? 'solid' : 'outline'}
        onClick={() => onChange('completed')}
      >
        выполненные
      </Button>
    </Flex>
  );
}
