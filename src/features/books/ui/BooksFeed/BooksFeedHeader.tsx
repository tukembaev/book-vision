import { Heading, Text } from '@chakra-ui/react';

export interface BooksFeedHeaderProps {
  title: string;
  subtitle: string;
}

export function BooksFeedHeader({ title, subtitle }: BooksFeedHeaderProps) {
  return (
    <>
      <Heading as="h2" size="md" fontWeight="600">
        {title}
      </Heading>
      <Text mt="2" opacity={0.8}>
        {subtitle}
      </Text>
    </>
  );
}
