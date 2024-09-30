'use client';

import { ReactQueryProvider } from './react-query-provider';
import { RecoilProvider } from './recoil-provider';
import { ThirdWebClientProvider } from './thirdweb-client-provider';

export function ClientSideProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <RecoilProvider>
        <ThirdWebClientProvider>{children}</ThirdWebClientProvider>
      </RecoilProvider>
    </ReactQueryProvider>
  );
}
