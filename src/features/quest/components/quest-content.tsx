'use client';

import React, { useEffect, useLayoutEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

export const DEFAULT_MAX_HEIGHT = 320;

export default function QuestContent({
  text,
  maxHeight = DEFAULT_MAX_HEIGHT,
}: {
  text: React.ReactNode;
  maxHeight?: number;
}) {
  const contentRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (!contentRef.current || !buttonRef.current) return;
    if (!text) return;

    // 이미 설정된 높이가 있다면 초기화
    contentRef.current.style.maxHeight = 'none';

    // 예상 높이 계산
    const estimatedHeight = contentRef.current.offsetHeight;

    if (estimatedHeight > maxHeight) {
      // 높이 제한
      contentRef.current.style.maxHeight = `${maxHeight}px`;
      buttonRef.current.style.display = 'block';
    } else {
      // 높이 제한 없음
      contentRef.current.style.maxHeight = 'none';
      buttonRef.current.style.display = 'none';
    }
  }, [text, maxHeight]);

  useEffect(() => {
    if (!contentRef.current || !buttonRef.current) return;
    buttonRef.current.addEventListener('click', () => {
      if (!contentRef.current || !buttonRef.current) return;
      contentRef.current.style.maxHeight = 'none';
      buttonRef.current.style.display = 'none';
    });

    return () => {
      if (!buttonRef.current) return;
      buttonRef.current.removeEventListener('click', () => {});
    };
  }, [text]);

  // There are cases where `\n` comes in as `\\n` in the data
  // coming through server, so it is processed.
  const processedText = text?.toString().replace(/\\n/g, '\n');

  return (
    <div className={cn(['overflow-hidden relative'])}>
      <button
        className="w-full bg-gradient-to-b from-white/0 via-white/80 to-white block absolute bottom-0 left-0 p-4 text-gray-700 hover:bg-white/80"
        ref={buttonRef}
      >
        See more
      </button>
      <p className="whitespace-pre-line text-sm text-gray-500" ref={contentRef}>
        {processedText}
      </p>
    </div>
  );
}
