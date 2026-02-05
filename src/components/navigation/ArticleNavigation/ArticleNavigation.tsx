import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { MenuIcon } from 'lucide-react';

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface ArticleNavigationProps {
  toc: TocItem[];
  activeTocId?: string;
  onTocClick: (id: string) => void;
}

export function ArticleNavigation({ toc, activeTocId, onTocClick }: ArticleNavigationProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Mobile navigation button */}
      <Box display={{ base: 'block', md: 'none' }} position="sticky" top="0" zIndex="sticky" bg="bg" borderBottomWidth="1px">
        <Button
          leftIcon={<MenuIcon size={16} />}
          variant="ghost"
          size="sm"
          onClick={onOpen}
          m="2"
        >
          Навигация по статье
        </Button>
      </Box>

      {/* Desktop navigation sidebar */}
      <Box display={{ base: 'none', md: 'block' }} position={{ base: 'static', lg: 'sticky' }} top={{ lg: '6' }}>
        <Box borderWidth="1px" borderRadius="md" p="4">
          <Heading as="h3" size="sm" fontWeight="700">
            Навигация
          </Heading>
          <Text mt="2" fontSize="sm" opacity={0.8}>
            По разделам статьи.
          </Text>

          <Stack mt="4" gap="2">
            {toc.map((t) => (
              <Button
                key={t.id}
                variant="ghost"
                size="sm"
                justifyContent="flex-start"
                onClick={() => onTocClick(t.id)}
                opacity={activeTocId === t.id ? 1 : 0.8}
                fontWeight={activeTocId === t.id ? '700' : '600'}
                pl={t.level === 3 ? '6' : '3'}
              >
                {t.text}
              </Button>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Mobile navigation drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Heading as="h3" size="sm" fontWeight="700">
              Навигация
            </Heading>
            <Text fontSize="sm" opacity={0.8}>
              По разделам статьи.
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <Stack gap="2">
              {toc.map((t) => (
                <Button
                  key={t.id}
                  variant="ghost"
                  size="sm"
                  justifyContent="flex-start"
                  onClick={() => {
                    onTocClick(t.id);
                    onClose();
                  }}
                  opacity={activeTocId === t.id ? 1 : 0.8}
                  fontWeight={activeTocId === t.id ? '700' : '600'}
                  pl={t.level === 3 ? '6' : '3'}
                >
                  {t.text}
                </Button>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
