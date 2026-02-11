import { Box, Flex, Heading, Text, Kbd } from '@chakra-ui/react';
import { Command } from 'cmdk';
import {
  BellIcon,
  BellOffIcon,
  CheckCircle2Icon,
  LayoutDashboardIcon,
  BarChart3Icon,
  HistoryIcon,
  HeartIcon,
  SettingsIcon,
  MenuIcon,
  SearchIcon,
  UsersIcon,
  BookOpen,
  PenTool,
  Users as UsersIcon2,
  Trophy,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { AppLink } from '../../navigation/AppLink/AppLink';
import { useHeaderLayoutStore } from './headerLayout.store';
import { useHeaderSearchStore } from './headerSearch.store';
import { mockSearchResults, categoryConfig } from './search.mock';

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
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const { showCenterTabs, centerTabs, activeTab, setActiveTab } = useHeaderLayoutStore();
  const { searchOpen, setSearchOpen, toggleSearch } = useHeaderSearchStore();

  // Close search on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, setSearchOpen, toggleSearch]);

  const filteredResults = mockSearchResults.filter((result) =>
    result.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    result.subtitle?.toLowerCase().includes(searchValue.toLowerCase())
  );

  const groupedResults = filteredResults.reduce((acc, result) => {
    if (!acc[result.category]) acc[result.category] = [];
    acc[result.category].push(result);
    return acc;
  }, {} as Record<string, typeof filteredResults>);

  return (
    <Box as="header" borderBottomWidth="1px" position="sticky" top="0" zIndex="sticky" bg="bg">
      {/* ── Search Command Palette ──────────────────────── */}
      {searchOpen && (
        <Box
          position="fixed"
          inset="0"
          bg="rgba(0, 0, 0, 0.4)"
          zIndex={60}
          onClick={() => setSearchOpen(false)}
        >
          <Command
            shouldFilter={false}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90%',
              maxWidth: '640px',
              maxHeight: '70vh',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
            }}
          >
            <Box px="4" py="3" borderBottomWidth="1px">
              <Flex align="center" gap="3">
                <SearchIcon size={18} opacity={0.5} />
                <Command.Input
                  placeholder="Поиск книг, авторов, клубов, челленджей..."
                  value={searchValue}
                  onValueChange={setSearchValue}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                  }}
                />
                <Kbd fontSize="10" px="1.5" py="0.5" rounded="md" bg="gray.100">
                  ESC
                </Kbd>
              </Flex>
            </Box>

            <Box maxHeight="400px" overflowY="auto">
              <Command.List style={{ padding: '8px' }}>
                {Object.entries(groupedResults).map(([category, results]) => (
                  <Command.Group key={category} heading={categoryConfig[category as keyof typeof categoryConfig].label}>
                    {results.map((result) => (
                      <Command.Item
                        key={result.id}
                        value={result.title}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '6px',
                          margin: '2px 0',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                        }}
                        onSelect={() => {
                          window.location.href = result.url;
                          setSearchOpen(false);
                        }}
                      >
                        <Box
                          w="8"
                          h="8"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          fontSize="12px"
                        >
                          {category === 'book' && <BookOpen size={16} opacity={0.6} />}
                          {category === 'author' && <PenTool size={16} opacity={0.6} />}
                          {category === 'club' && <UsersIcon2 size={16} opacity={0.6} />}
                          {category === 'challenge' && <Trophy size={16} opacity={0.6} />}
                        </Box>
                        <Box flex="1">
                          <Text fontSize="sm" fontWeight="500">
                            {result.title}
                          </Text>
                          {result.subtitle && (
                            <Text fontSize="xs" opacity={0.6}>
                              {result.subtitle}
                            </Text>
                          )}
                        </Box>
                      </Command.Item>
                    ))}
                  </Command.Group>
                ))}
                
                {filteredResults.length === 0 && (
                  <Box py="8" textAlign="center">
                    <Text fontSize="sm" opacity={0.5}>
                      Ничего не найдено
                    </Text>
                  </Box>
                )}
              </Command.List>
            </Box>
          </Command>
        </Box>
      )}

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
            onClick={() => { toggleSearch(); setNotifOpen(false); }}
            title="Поиск (Ctrl+K)"
          >
            <SearchIcon size={18} />
          </Box>

          {/* Bell + Notification dropdown */}
          <Box position="relative" ref={notifRef}>
            <Box
              as="button"
              p="2"
              borderRadius="full"
              _hover={{ bg: 'gray.100' }}
              cursor="pointer"
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => { setNotifOpen((v) => !v); setSearchOpen(false); }}
            >
              <BellIcon size={18} />
            </Box>

            {notifOpen && (
              <>
                <Box
                  position="fixed"
                  inset="0"
                  zIndex={40}
                  onClick={() => setNotifOpen(false)}
                />
                <Box
                  position="absolute"
                  top="calc(100% + 8px)"
                  right="0"
                  bg="white"
                  borderWidth="1px"
                  borderRadius="xl"
                  shadow="lg"
                  w="360px"
                  zIndex={50}
                  overflow="hidden"
                >
                  {/* Header */}
                  <Flex align="center" justify="space-between" px="4" py="3" borderBottomWidth="1px">
                    <Flex align="center" gap="3">
                      <Text fontWeight="700" fontSize="sm">Notifications</Text>
                      <Flex
                        align="center"
                        gap="1"
                        px="2"
                        py="0.5"
                        borderWidth="1px"
                        borderRadius="md"
                        cursor="pointer"
                      >
                        <Text fontSize="xs" opacity={0.7}>All</Text>
                        <Text fontSize="xs" opacity={0.5}>▾</Text>
                      </Flex>
                    </Flex>
                    <Flex align="center" gap="1" cursor="pointer" opacity={0.6}>
                      <CheckCircle2Icon size={14} />
                      <Text fontSize="xs">Mark all as read</Text>
                    </Flex>
                  </Flex>

                  {/* Empty state */}
                  <Flex direction="column" align="center" justify="center" py="12" px="4">
                    <BellOffIcon size={40} style={{ opacity: 0.2 }} />
                    <Text mt="3" fontSize="sm" opacity={0.5}>
                      Quiet for now. Check back later.
                    </Text>
                  </Flex>
                </Box>
              </>
            )}
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
