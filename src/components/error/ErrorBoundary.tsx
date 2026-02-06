import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Box, Button, Text, Stack } from '@chakra-ui/react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Box p="6" textAlign="center">
          <Stack gap="4" maxW="400px" mx="auto">
            <Text fontSize="lg" fontWeight="600" color="red.500">
              Ошибка загрузки страницы
            </Text>
            <Text opacity={0.8}>
              Не удалось загрузить компонент. Попробуйте обновить страницу.
            </Text>
            {this.state.error?.message && (
              <Text fontSize="sm" opacity={0.6} fontFamily="mono">
                {this.state.error.message}
              </Text>
            )}
            <Button onClick={this.handleRetry} colorScheme="blue">
              Попробовать снова
            </Button>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
              size="sm"
            >
              Обновить страницу
            </Button>
          </Stack>
        </Box>
      )
    }

    return this.props.children
  }
}
