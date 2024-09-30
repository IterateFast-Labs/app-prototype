import { cn } from '@/lib/utils';

export function ScreenContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function ScreenActions({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn([
        'p-4 border-t fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-screen-sm bg-white',
        className,
      ])}
    >
      {children}
    </div>
  );
}
