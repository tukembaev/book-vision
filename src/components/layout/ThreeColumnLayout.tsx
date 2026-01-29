import type { ReactNode } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

export interface ThreeColumnLayoutProps {
  left?: ReactNode;
  center: ReactNode;
  right?: ReactNode;
}

export function ThreeColumnLayout({ left, center, right }: ThreeColumnLayoutProps) {
  const hasRight = Boolean(right);

  return (
    <Grid
      gap="6"
      alignItems="start"
      templateColumns={{ base: '1fr', lg: hasRight ? '260px 1fr 320px' : '260px 1fr' }}
    >
      <GridItem>{left}</GridItem>
      <GridItem>{center}</GridItem>
      {hasRight ? <GridItem>{right}</GridItem> : null}
    </Grid>
  );
}
