import { useState } from 'react';
import { Box, Text, Menu, Portal, Slider, HStack } from '@chakra-ui/react';

interface ScoreSliderProps {
  score?: number;
  onChange?: (score: number) => void;
  readonly?: boolean;
}

export function ScoreSlider({ score, onChange, readonly }: ScoreSliderProps) {
  const [tempScore, setTempScore] = useState(score ?? 5);

  const displayScore = score ?? '—';

  if (readonly || !onChange) {
    return (
      <Text fontSize="sm" fontWeight="500">
        {displayScore}
      </Text>
    );
  }

  return (
    <Menu.Root
      onOpenChange={(details) => {
        if (details.open) {
          setTempScore(score ?? 5);
        }
      }}
    >
      <Menu.Trigger asChild>
        <Box
          px={2}
          py={1}
          borderRadius="md"
          cursor="pointer"
          display="inline-block"
        >
          <Text fontSize="sm" fontWeight="500">
            {displayScore}
          </Text>
        </Box>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content p={4} minW="200px">
            <Box>
              <Text fontSize="sm" mb={3}>
                Рейтинг: {tempScore}
              </Text>
              <Slider.Root
                value={[tempScore]}
                min={1}
                max={10}
                step={1}
                onValueChange={(details) => setTempScore(details.value[0])}
                onValueChangeEnd={(details) => onChange(details.value[0])}
              >
                <Slider.Control>
                  <Slider.Track h="6px">
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumb index={0} boxSize={4} />
                </Slider.Control>
                <Slider.MarkerGroup mt={2}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
                    <Slider.Marker key={v} value={v}>
                      <Text fontSize="xs">{v}</Text>
                    </Slider.Marker>
                  ))}
                </Slider.MarkerGroup>
              </Slider.Root>
              <HStack justify="space-between" mt={4}>
                <Text fontSize="xs">1</Text>
                <Text fontSize="xs">10</Text>
              </HStack>
            </Box>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
