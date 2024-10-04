import { Metadata } from 'next';

import { ScreenContainer } from '@/components/layout/screen-layout';
import ProfileSetupForm from '@/features/profile/components/profile-setup-form';

export default function ProfileSetup() {
  return (
    <main>
      <ScreenContainer className="min-h-svh flex flex-col pb-20">
        <ProfileSetupForm />
      </ScreenContainer>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Profile Setup',
  description: 'Set up your profile to get started',
};
