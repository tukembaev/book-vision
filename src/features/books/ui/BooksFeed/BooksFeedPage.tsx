import { Box, Stack } from '@chakra-ui/react';

import { mockBooksDb } from '../../mocks/booksDb.mock';
import { BooksFeedHeader } from './BooksFeedHeader';
import { BooksFeedList } from './BooksFeedList';

export default function BooksFeedPage() {
  return (
    <Box>
      <Stack gap="0">
        <BooksFeedHeader
          title="Главная"
          subtitle="Лента книг (mock). Перейди в книгу, чтобы увидеть 3-колоночную страницу и оглавление."
        />
        <BooksFeedList books={mockBooksDb} />
      </Stack>
    </Box>
  );
}
