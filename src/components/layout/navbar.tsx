import React from 'react';

export function SubpageNav({
  left,
  right,
}: {
  left?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <nav className="sticky top-0 left-0 w-full z-10 bg-black/20 h-10 flex justify-between gap-4">
      {left}
      {right}
    </nav>
  );
}
