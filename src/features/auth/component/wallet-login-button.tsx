'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  useConnectModal,
  useConnectedWallets,
  useDisconnect,
} from 'thirdweb/react';
import { inAppWallet } from 'thirdweb/wallets';

import { Button } from '@/components/ui/button';
import { thirdwebClient } from '@/providers/client/thirdweb-client-provider';
import { createNonce, useLogin } from '@/requests/auth';
import { useTokenStore } from '@/states/token-store';

export function WalletLoginButton() {
  const router = useRouter();
  const wallets = useConnectedWallets();
  const { connect, isConnecting } = useConnectModal();
  const { disconnect } = useDisconnect();
  const { mutateAsync } = useLogin();
  const setAccessToken = useTokenStore((state) => state.setAccessToken);
  const locale = useLocale();

  const handleConnectWallet = async () => {
    if (wallets.length > 0) {
      for (const wallet of wallets) {
        disconnect(wallet);
      }
    }

    let canRedirect: boolean = false;

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

      const account = wallet.getAccount();

      if (!account) {
        return;
      }

      if (!account.address) {
        return;
      }

      const { value, message } = await createNonce({
        walletAddress: account.address as `0x${string}`,
      });

      const chainId = wallet.getChain()?.id;

      if (!chainId) {
        return;
      }

      const signature = await account.signMessage({
        message,
      });

      const { accessToken } = await mutateAsync({
        signature,
        walletAddress: account.address as `0x${string}`,
      });

      if (accessToken) {
        canRedirect = true;
      }

      setAccessToken(accessToken);

      router.push(`/${locale}/dashboard`);
    } catch (error) {
      // TODO: Handle error
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
