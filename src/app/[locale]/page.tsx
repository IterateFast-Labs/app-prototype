import { useTranslations } from 'next-intl';

import { ImageMarquee } from '@/components/image-marquee';
import {
  ScreenActions,
  ScreenContainer,
} from '@/components/layout/screen-layout';
import { Button } from '@/components/ui/button';

export default function Home() {
  const t = useTranslations();
  return (
    <main>
      <ScreenContainer className="min-h-svh flex flex-col justify-center pb-12">
        <div className="flex flex-col gap-2 space-y-6 py-8">
          <header className="px-4 py-8 flex justify-center">
            <h1 className="font-extrabold text-2xl">[{t('SERVICE_NAME')}]</h1>
          </header>

          <div>
            <ImageMarquee />
          </div>

          <p className="text-center font-normal text-sm">
            You can do .... <br />
            this is amazing wow what a good app
          </p>
        </div>

        <ScreenActions>
          <Button size="lg" className="w-full">
            <span className="font-bold">Connect Wallet</span>
          </Button>
        </ScreenActions>
      </ScreenContainer>
    </main>
  );
}
