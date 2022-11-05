import { PropsWithChildren } from 'react';
import classNames from '../../../helpers/classNames';

type Props = { className: string; withOverlay: boolean };

export default function CommonCard({
    children,
    className,
    withOverlay,
}: PropsWithChildren<Props>) {
    return (
        <article
            className={classNames(
                className,
                'relative rounded border border-primary dark:border-dark-primary w-full shadow-md flex flex-col px-6 pt-2',
                withOverlay ? 'overflow-hidden' : 'pb-6'
            )}
        >
            {children}
            {withOverlay && (
                <div className="absolute bottom-0 h-8 w-full z-10 bg-gradient-to-b from-transparent to-white dark:to-gray-900"></div>
            )}
        </article>
    );
}
