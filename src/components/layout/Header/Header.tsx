import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import {
  BellIcon,
  LayoutDashboardIcon,
  BarChart3Icon,
  HistoryIcon,
  HeartIcon,
  SettingsIcon,
  MenuIcon,
  SearchIcon,
  UsersIcon,
} from 'lucide-react';
import { useRef, useState } from 'react';

import { AppLink } from '../../navigation/AppLink/AppLink';
import { useHeaderLayoutStore } from './headerLayout.store';

/* ─── Sidebar menu items ──────────────────────────────── */

const menuItems = [
  { label: 'Главная', icon: LayoutDashboardIcon, to: '/', color: 'purple' },
  { label: 'Книги', icon: BarChart3Icon, to: '/books', color: 'green' },
  { label: 'Статьи', icon: HistoryIcon, to: '/articles', color: 'red' },
  { label: 'Персонажи', icon: HeartIcon, to: '/characters', color: 'pink' },
  { label: 'Челленджи', icon: SettingsIcon, to: '/challenges', color: 'purple' },
  { label: 'Клубы', icon: UsersIcon, to: '/clubs', color: 'teal' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { showCenterTabs, centerTabs, activeTab, setActiveTab } = useHeaderLayoutStore();

  return (
    <Box as="header" borderBottomWidth="1px" position="sticky" top="0" zIndex="sticky" bg="bg">
      <Flex align="center" justify="space-between" px="6" py="3" position="relative">
        {/* ── Left: Hamburger + Logo ──────────────── */}
        <Flex align="center" gap="3" position="relative" ref={menuRef}>
          <Box
            as="button"
            onClick={() => setMenuOpen((v) => !v)}
            p="1"
            borderRadius="md"
            _hover={{ bg: 'gray.100' }}
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <MenuIcon size={22} />
          </Box>

          <AppLink to="/">
            <Heading as="h1" fontSize="lg" fontWeight="700">
              BookVision
            </Heading>
          </AppLink>

          {/* Dropdown menu */}
          {menuOpen && (
            <>
              {/* Backdrop */}
              <Box
                position="fixed"
                inset="0"
                zIndex={40}
                onClick={() => setMenuOpen(false)}
              />

              <Box
                position="absolute"
                top="calc(100% + 8px)"
                left="0"
                bg="white"
                borderWidth="1px"
                borderRadius="xl"
                shadow="lg"
                py="2"
                px="1"
                minW="200px"
                zIndex={50}
              >
                {menuItems.map((item) => (
                  <AppLink
                    key={item.label}
                    to={item.to}
                    display="flex"
                    alignItems="center"
                    gap="3"
                    px="3"
                    py="2"
                    borderRadius="lg"
                    _hover={{ bg: 'gray.50', textDecoration: 'none' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <Box
                      w="28px"
                      h="28px"
                      borderRadius="lg"
                      bg={`${item.color}.100`}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <item.icon size={15} color={`var(--chakra-colors-${item.color}-500)`} />
                    </Box>
                    <Text fontSize="sm" fontWeight="500" color="gray.700">
                      {item.label}
                    </Text>
                  </AppLink>
                ))}
              </Box>
            </>
          )}
        </Flex>

        {/* ── Center: Conditional tabs ────────────── */}
        {showCenterTabs && centerTabs.length > 0 && (
          <Flex
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
            bg="white"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            {centerTabs.map((tab) => (
              <Box
                key={tab.value}
                as="button"
                px="4"
                py="1.5"
                fontSize="sm"
                fontWeight="500"
                cursor="pointer"
                bg={activeTab === tab.value ? 'gray.900' : 'transparent'}
                color={activeTab === tab.value ? 'white' : 'gray.600'}
                _hover={activeTab !== tab.value ? { bg: 'gray.50' } : {}}
                transition="all 0.15s"
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </Box>
            ))}
          </Flex>
        )}

        {/* ── Right: Search, Bell, Avatar ─────────── */}
        <Flex align="center" gap="3">
          <Box
            as="button"
            p="2"
            borderRadius="full"
            _hover={{ bg: 'gray.100' }}
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <SearchIcon size={18} />
          </Box>

          <Box
            as="button"
            p="2"
            borderRadius="full"
            _hover={{ bg: 'gray.100' }}
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <BellIcon size={18} />
          </Box>

          <AppLink to="/users/u1">
            <Box
              w="32px"
              h="32px"
              borderRadius="full"
              bg="gray.200"
              backgroundImage="url(https://i.pravatar.cc/64?u=arif)"
              backgroundSize="cover"
              backgroundPosition="center"
              cursor="pointer"
              border="2px solid"
              borderColor="gray.100"
            />
          </AppLink>
        </Flex>
      </Flex>
    </Box>
  );
}
