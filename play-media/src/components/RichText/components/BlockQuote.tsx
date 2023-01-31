import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode[];
}

export const BlockQuote: FC<Props> = ({ children }) => (
  <blockquote className="flex">{children}</blockquote>
);
