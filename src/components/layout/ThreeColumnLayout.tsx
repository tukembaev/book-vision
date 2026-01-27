import type { ReactNode } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

export interface ThreeColumnLayoutProps {
  left?: ReactNode;
  center: ReactNode;
  right?: ReactNode;
}

export function ThreeColumnLayout({ left, center, right }: ThreeColumnLayoutProps) {
  return (
    <Grid
      gap="6"
      alignItems="start"
      templateColumns={{ base: '1fr', lg: '260px 1fr 320px' }}
    >
      <GridItem>{left}</GridItem>
      <GridItem>{center}</GridItem>
      <GridItem>{right}</GridItem>
    </Grid>
  );
}
