'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';

export interface ActiveLinkProps extends React.ComponentProps<typeof Link> {
  activeClassname?: string;
}

// eslint-disable-next-line react/display-name
export const ActiveLink = React.forwardRef<HTMLAnchorElement, ActiveLinkProps>(
  ({ activeClassname, className, ...props }, ref) => {
    const path = usePathname();
    const isActive = path === props.href;
    return (
      <Link
        {...props}
        className={clsx(className, isActive && activeClassname)}
        ref={ref}
      />
    );
  },
);
