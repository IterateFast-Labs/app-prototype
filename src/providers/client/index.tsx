import { ReactQueryProvider } from './react-query-provider';

export function ClientSideProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
