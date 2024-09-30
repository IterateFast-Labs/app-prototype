import { createThirdwebClient } from 'thirdweb';
import { ThirdwebProvider } from 'thirdweb/react';

export const thirdwebClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});

export function ThirdWebClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThirdwebProvider>{children}</ThirdwebProvider>;
}
