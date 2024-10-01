'use client';

import { ReactQueryProvider } from './react-query-provider';
import { ThirdWebClientProvider } from './thirdweb-client-provider';

export function ClientSideProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <ThirdWebClientProvider>{children}</ThirdWebClientProvider>
    </ReactQueryProvider>
  );
}
