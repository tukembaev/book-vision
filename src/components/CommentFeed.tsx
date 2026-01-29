import React from "react";
import {
  Box,
  Container,
  HStack,
  Text,
  Avatar,
  VStack,
  Link,
  Badge,
  Flex,
} from "@chakra-ui/react";

interface User {
  name: string;
  avatar: string;
}

interface CommentData {
  id: string;
  user: User;
  content: string;
  date: string;
  isAuthor?: boolean;
  replies?: CommentData[];
}

const mockComments: CommentData[] = [
  {
    id: "1",
    user: {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/300?u=px",
    },
    date: "1d",
    content:
      "This is a great feature request! I've been looking for something similar. The current theming system could definitely use some improvements in terms of customization options.",
    replies: [
      {
        id: "2",
        user: {
          name: "Emily Smith",
          avatar: "https://i.pravatar.cc/300?u=po",
        },
        date: "1d",
        isAuthor: true,
        content:
          "Thank you for the suggestion! I'll look into it and get back to you soon.",
      },
    ],
  },
];

const ActionLinks = () => (
  <HStack fontSize="xs" fontWeight="semibold" color="gray.500">
    <Link _hover={{ textDecor: "underline" }}>1d</Link>
    <Link _hover={{ textDecor: "underline" }}>Like</Link>
    <Link _hover={{ textDecor: "underline" }}>Reply</Link>
  </HStack>
);

const CommentBubble = ({
  user,
  content,
  isAuthor,
}: {
  user: User;
  content: string;
  isAuthor?: boolean;
}) => (
  <Box bg="gray.100" rounded="lg" p={3}>
    <HStack mb={1} align="center">
      <Text fontSize="sm" fontWeight="bold" color="gray.900">
        {user.name}
      </Text>
      {isAuthor && (
        <Badge colorScheme="teal" variant="solid" fontSize="xs" rounded="md" px={1}>
          Author
        </Badge>
      )}
    </HStack>
    <Text fontSize="sm" color="gray.600" lineHeight="tall">
      {content}
    </Text>
  </Box>
);

export default function CommentFeed() {
  return (
    <Container maxW="42rem" py={8}>
      {mockComments.map((comment) => (
        <React.Fragment key={comment.id}>
          {/* Parent Comment */}
          <Box position="relative">
            {/* Vertical Line for threading if needed (matches the snippet logic) */}
            {comment.replies && comment.replies.length > 0 && (
              <Box
                position="absolute"
                left="2rem"
                top="3rem"
                bottom="0px"
                width="2px"
                bg="gray.200"
                zIndex={0}
              />
            )}

            <Flex gap={4} py={2} pl={4} position="relative" zIndex={1}>
              <Avatar.Root>
                <Avatar.Fallback name="Segun Adebayo" />
                <Avatar.Image src="https://bit.ly/sage-adebayo" />
              </Avatar.Root>
              <VStack align="start" flex={1}>
                <CommentBubble
                  user={comment.user}
                  content={comment.content}
                />
                <ActionLinks />
              </VStack>
            </Flex>
          </Box>

          {/* Replies */}
          {comment.replies?.map((reply) => (
            <Box position="relative" key={reply.id} pt={2}>
              {/* Connector Curve */}
              <Box
                position="absolute"
                left="2rem"
                top="0"
                width="1.25rem"
                height="2rem"
                borderBottom="2px solid"
                borderLeft="2px solid"
                borderColor="gray.200"
                borderBottomLeftRadius="lg"
                zIndex={0}
              />

              {/* Reply Content */}
              <Flex gap={4} py={2} pl={14} position="relative" zIndex={1}>
                <Avatar.Root>
                  <Avatar.Fallback name="Segun Adebayo" />
                  <Avatar.Image src="https://bit.ly/sage-adebayo" />
                </Avatar.Root>
                <VStack align="start" flex={1}>
                  <CommentBubble
                    user={reply.user}
                    content={reply.content}
                    isAuthor={reply.isAuthor}
                  />
                  <ActionLinks />
                </VStack>
              </Flex>
            </Box>
          ))}
        </React.Fragment>
      ))}
    </Container>
  );
}
