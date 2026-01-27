import { Link, type LinkProps } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export interface AppLinkProps extends Omit<LinkProps, 'href'> {
  to: string;
}

export function AppLink({ to, onClick, ...props }: AppLinkProps) {
  const navigate = useNavigate();

  return (
    <Link
      href={to}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
        navigate(to);
      }}
      {...props}
    />
  );
}
