import { Box, Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import { Header } from '../Header/Header';

export function AppLayout() {
  return (
    <Box minH="100vh">
      <Header />
      <Container as="main"  py="6">
        <Outlet />
      </Container>
    </Box>
  );
}
