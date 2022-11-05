import { PropsWithChildren } from 'react';
import Link from '../Link';
import { DiGithubBadge } from 'react-icons/di';
import { HiMoon } from 'react-icons/hi2';

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
                <Link className="mx-3 text-xl font-fancy no-underline" href="/">
                    Littledev
                </Link>
                <ul className="flex text-white no-underline">
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
                            href="https://github.com/blackshadev/"
                            title="My Github"
                        >
                            <DiGithubBadge size="1.5rem" />
                        </a>
                    </li>
                    <li className="px-3">
                        <button>
                            <HiMoon size="1.5rem" />
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
