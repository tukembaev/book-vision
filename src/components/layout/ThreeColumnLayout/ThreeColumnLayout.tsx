import type { ReactNode } from 'react';
import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';

export interface ThreeColumnLayoutProps {
  left?: ReactNode;
  center: ReactNode;
  right?: ReactNode;
}

export function ThreeColumnLayout({ left, center, right }: ThreeColumnLayoutProps) {
  const hasRight = Boolean(right);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false });

  // On mobile, show only center content
  // On tablet, show two columns (left + center or center + right)
  // On desktop, show all three columns
  const templateColumns = useBreakpointValue({
    base: '1fr',
    md: hasRight ? '1fr' : '250px 1fr',
    lg: hasRight ? '260px 1fr 320px' : '260px 1fr',
  });

  return (
    <Grid
      gap="6"
      alignItems="start"
      templateColumns={templateColumns}
    >
      {/* Left sidebar - hide on mobile, show on tablet+ */}
      {left && !isMobile && (
        <GridItem 
          display={{ base: 'none', md: isTablet && hasRight ? 'none' : 'block', lg: 'block' }}
        >
          {left}
        </GridItem>
      )}
      
      {/* Center content - always visible */}
      <GridItem>
        {center}
      </GridItem>
      
      {/* Right sidebar - hide on mobile and tablet when left sidebar is present */}
      {hasRight && !isMobile && (
        <GridItem 
          display={{ base: 'none', md: isTablet ? 'block' : 'block', lg: 'block' }}
        >
          {right}
        </GridItem>
      )}
    </Grid>
  );
}
