'use client';

import {
  useConnectModal,
  useConnectedWallets,
  useDisconnect,
} from 'thirdweb/react';
import { inAppWallet } from 'thirdweb/wallets';

import { Button } from '@/components/ui/button';
import { thirdwebClient } from '@/providers/client/thirdweb-client-provider';

export function WalletLoginButton() {
  const wallets = useConnectedWallets();
  const { connect, isConnecting } = useConnectModal();
  const { disconnect } = useDisconnect();

  const handleConnectWallet = async () => {
    try {
      const wallet = await connect({
        client: thirdwebClient,
        wallets: [
          inAppWallet({
            auth: {
              options: ['line'],
            },
          }),
        ],
        theme: 'light',
        size: 'compact',
      });

      if (wallet) {
        disconnect(wallet);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      disabled={isConnecting}
      size="lg"
      className="w-full"
      onClick={handleConnectWallet}
    >
      <span className="font-bold">Connect Wallet</span>
    </Button>
  );
}
