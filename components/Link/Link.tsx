'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps } from 'react';
import classNames from '../../helpers/classNames';

type Props = ComponentProps<typeof NextLink> & {
    activeClassName?: string;
    inactiveClassName?: string;
    className?: string;
};
export default function Link({
    activeClassName,
    inactiveClassName,
    className,
    href,
    children,
    ...props
}: Props) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <NextLink
            href={href}
            className={classNames(
                isActive ? activeClassName : inactiveClassName,
                className
            )}
            {...props}
        >
            {children}
        </NextLink>
    );
}
