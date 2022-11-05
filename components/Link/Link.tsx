import NextLink from 'next/link';
import { useRouter } from 'next/router';
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
    const router = useRouter();
    const isActive = router.pathname === href;

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
