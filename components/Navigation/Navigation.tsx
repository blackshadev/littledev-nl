import { PropsWithChildren } from 'react';
import Link from '../Link';
import { SiGithub, SiMastodon } from 'react-icons/si';
import DarkModeToggle from '../DarkModeToggle';

function NavLink({ href, children }: PropsWithChildren<{ href: string }>) {
    return (
        <Link
            href={href}
            inactiveClassName="no-underline"
            activeClassName="underline"
        >
            {children}
        </Link>
    );
}

export default function Navigation() {
    return (
        <div className="bg-nav dark:bg-dark-nav py-3">
            <nav className="container mx-auto flex justify-between flex-wrap text-white">
                <Link
                    className="ml-3 md:mx-3 md:text-xl font-fancy no-underline"
                    href="/"
                >
                    Littledev
                </Link>
                <ul className="flex text-white no-underline items-center">
                    <li className="px-3">
                        <NavLink href="/about">About</NavLink>
                    </li>
                    <li className="px-3">
                        <NavLink href="/blog">Blog</NavLink>
                    </li>
                    <li className="px-3">
                        <NavLink href="/projects">Projects</NavLink>
                    </li>

                    <li className="px-3">
                        <a
                            rel="me noopener noreferrer"
                            href="https://mas.to/@littledev"
                            target="_blank"
                            title="@littledev on Mastodon"
                        >
                            <SiMastodon
                                className="text-white dark:text-white"
                                size="1rem"
                            />
                        </a>
                    </li>
                    <li className="px-3">
                        <a
                            href="https://github.com/blackshadev/"
                            target="_blank"
                            title="My Github"
                            rel="noreferrer noopener"
                        >
                            <SiGithub
                                className="text-white dark:text-white"
                                size="1rem"
                            />
                        </a>
                    </li>
                    <li className="px-3">
                        <DarkModeToggle size="1rem" />
                    </li>
                </ul>
            </nav>
        </div>
    );
}
