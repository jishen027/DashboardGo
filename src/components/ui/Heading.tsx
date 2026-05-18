import React from 'react';

type HeadingLevel = 1 | 2 | 3 | 4;

interface HeadingProps {
  level?: HeadingLevel;
  children: React.ReactNode;
  className?: string;
}

const classes: Record<HeadingLevel, string> = {
  1: 'text-4xl font-black tracking-tight text-[#1A1A1A] dark:text-stone-100 leading-none',
  2: 'text-2xl font-bold tracking-tight text-[#1A1A1A] dark:text-stone-100 leading-snug',
  3: 'text-lg font-semibold text-[#1A1A1A] dark:text-stone-200 leading-snug',
  4: 'text-sm font-semibold text-[#1A1A1A] dark:text-stone-300 leading-normal',
};

const tags = { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4' } as const;

export function Heading({ level = 1, children, className = '' }: HeadingProps) {
  return React.createElement(tags[level], { className: `${classes[level]} ${className}` }, children);
}
