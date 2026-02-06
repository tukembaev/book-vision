import { Box, Carousel, IconButton } from '@chakra-ui/react';

import type { Book } from '@/types/core';
import { BooksCatalogListItem } from '@/features/books/ui/BooksCatalog/BooksCatalogListItem';
import { LucideArrowLeft, LucideArrowRight } from 'lucide-react';

interface BooksCarouselProps {
  books: Book[];
}

export function BooksCarousel({ books }: BooksCarouselProps) {
  return (
    <Carousel.Root slideCount={books.length} slidesPerPage={6} slidesPerMove={2} spacing="16px">
      <Carousel.Control justifyContent="center" gap="4" width="full">
           <Carousel.PrevTrigger asChild>
          <IconButton size="xs" variant="outline">
            <LucideArrowLeft />
          </IconButton>
        </Carousel.PrevTrigger>

    <Carousel.ItemGroup>
        {books.map((book, index) => (
          <Carousel.Item key={book.id} index={index}>
            <Box maxW="160px" mx="auto">
              <BooksCatalogListItem book={book} />
            </Box>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
         <Carousel.NextTrigger asChild>
          <IconButton size="xs" variant="outline">
            <LucideArrowRight />
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>

    </Carousel.Root>
  );
}
