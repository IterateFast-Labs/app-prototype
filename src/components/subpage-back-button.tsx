import { ChevronLeft } from 'lucide-react';
import Link, { LinkProps } from 'next/link';

import { cn } from '@/lib/utils';

import { buttonVariants } from './ui/button';

export function SubpageBackLink({
  className,
  ...props
}: LinkProps & { className?: string }) {
  return (
    <Link
      className={buttonVariants({
        variant: 'ghost',
        size: 'icon',
        className: cn(['group rounded-none', className]),
      })}
      {...props}
    >
      <ChevronLeft size={24} className="text-white group-hover:text-black" />
      <span className="sr-only">Back</span>
    </Link>
  );
}
