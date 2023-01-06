import { PropsWithChildren, useEffect, useState } from 'react';
import Link from '../Link';
import { SiGithub, SiMastodon } from 'react-icons/si';
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
    const [darkMode, setDarkMode] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    function toggleDarkMode(): void {
        setDarkMode(!darkMode);
    }

    useEffect(() => {
        const browserInDarkMode =
            localStorage.getItem('theme') === 'dark' ||
            window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(browserInDarkMode);
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (!isLoaded) {
            return;
        }

        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode, isLoaded]);

    return (
        <div className="bg-nav dark:bg-dark-nav py-3">
            <nav className="container mx-auto flex justify-between flex-wrap text-white">
                <Link
                    className="ml-3 md:mx-3 md:text-xl font-fancy no-underline"
                    href="/"
                >
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
                            rel="me noopener noreferrer"
                            href="https://mas.to/@littledev"
                            target="_blank"
                            title="@littledev on Mastodon"
                        >
                            <SiMastodon
                                className="text-white dark:text-white"
                                size="1.4rem"
                            />
                        </a>
                    </li>
                    <li className="px-3">
                        <a
                            href="https://github.com/blackshadev/"
                            title="My Github"
                        >
                            <SiGithub
                                className="text-white dark:text-white"
                                size="1.4rem"
                            />
                        </a>
                    </li>
                    <li className="px-3">
                        <button onClick={toggleDarkMode}>
                            <HiMoon size="1.5rem" />
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
