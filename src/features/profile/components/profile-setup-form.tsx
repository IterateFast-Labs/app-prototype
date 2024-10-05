'use client';

import { AnimatePresence } from 'framer-motion';
import * as motion from 'framer-motion/client';
import { ChevronLeftIcon } from 'lucide-react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ScreenActions } from '@/components/layout/screen-layout';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useGetInterests } from '@/requests/general';
import { UpdateProfileBody, useUpdateProfile } from '@/requests/user-profile';

enum ProfileSetupStep {
  Onboarding,
  Nickname,
  Interests,
  Done,
}

export default function ProfileSetupForm() {
  const [step, setStep] = useState<ProfileSetupStep>(ProfileSetupStep.Nickname);

  const { data } = useGetInterests();
  const locale = useLocale();

  const { mutateAsync } = useUpdateProfile();

  const { register, handleSubmit, setValue, watch } =
    useForm<UpdateProfileBody>({
      defaultValues: {
        interests: [],
        nickname: '',
      },
    });

  const onSubmit = async (formData: UpdateProfileBody) => {
    try {
      await mutateAsync(formData);
      toast.success('Profile updated successfully');
      setStep(ProfileSetupStep.Done);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {step === ProfileSetupStep.Interests && (
        <nav className="absolute top-0 left-0 w-full z-10">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setStep(ProfileSetupStep.Nickname)}
          >
            <ChevronLeftIcon size={24} />
          </Button>
        </nav>
      )}
      {step === ProfileSetupStep.Nickname && (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="flex flex-col gap-2 space-y-6 py-8"
          >
            <header className="px-4 py-8 space-y-4">
              <h1 className="font-bold text-xl">What should we call you?</h1>
              <p className="text-sm text-gray-600">
                Please enter your nickname.
              </p>
            </header>
            <div className="px-4">
              <Input
                autoFocus
                placeholder="Nickname"
                {...register('nickname')}
              />
            </div>
            <ScreenActions>
              <Button
                type="button"
                className="w-full"
                size="lg"
                onClick={(e) => {
                  e.preventDefault();
                  setStep(ProfileSetupStep.Interests);
                }}
              >
                Next
              </Button>
            </ScreenActions>
          </motion.div>
        </AnimatePresence>
      )}
      {step === ProfileSetupStep.Interests && (
        <AnimatePresence>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="flex flex-col gap-2 space-y-6 py-8"
          >
            <header className="px-4 py-8 space-y-4">
              <h1 className="font-bold text-xl">What&apos;s your interest?</h1>
            </header>
            <div className="px-4 flex gap-3 flex-wrap">
              {data?.interests?.map((interest) => (
                <Button
                  type="button"
                  variant="outline"
                  key={interest.name}
                  className={cn([
                    watch('interests')?.includes(interest.name) &&
                      'bg-black text-white hover:bg-black hover:text-white',
                  ])}
                  size="sm"
                  onClick={() => {
                    setValue(
                      'interests',
                      watch('interests').includes(interest.name)
                        ? watch('interests').filter(
                            (selected) => selected !== interest.name,
                          )
                        : [...watch('interests'), interest.name],
                    );
                  }}
                >
                  {interest.name}
                </Button>
              ))}
            </div>

            <ScreenActions>
              <Button type="submit" className="w-full" size="lg">
                Confirm
              </Button>
            </ScreenActions>
          </motion.div>
        </AnimatePresence>
      )}
      {step === ProfileSetupStep.Done && (
        <AnimatePresence>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="flex flex-col gap-2 space-y-6 py-8"
          >
            <header className="px-4 py-8 space-y-4">
              <h1 className="font-bold text-xl">
                Perfect!
                <br />
                Now your profile is all set up.
              </h1>
            </header>
            <div className="px-4 flex gap-3 flex-wrap pt-20">
              <svg
                className="mx-auto"
                width="93"
                height="73"
                viewBox="0 0 93 73"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.5 43.5L26.5 66.5L89.5 3.5"
                  stroke="black"
                  strokeWidth="8"
                />
              </svg>
            </div>

            <ScreenActions>
              <Link
                href={`/${locale}/quest`}
                className={buttonVariants({
                  size: 'lg',
                  className: 'w-full',
                })}
              >
                Go find my quests
              </Link>
            </ScreenActions>
          </motion.div>
        </AnimatePresence>
      )}
    </form>
  );
}
