'use client';

import { ReactQueryProvider } from './react-query-provider';
import { RecoilProvider } from './recoil';

export function ClientSideProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <RecoilProvider>{children}</RecoilProvider>
    </ReactQueryProvider>
  );
}
