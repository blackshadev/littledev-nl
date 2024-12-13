'use client';

import { ReactNode, useEffect, useState } from 'react';
import { BsFillMoonFill as Moon, BsSunFill as Sun } from 'react-icons/bs';

export default function DarkModeToggle({ size }: { size: string }): ReactNode {
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
        <button type="button" className="flow-root" onClick={toggleDarkMode}>
            {darkMode ? <Sun size={size} /> : <Moon size={size} />}
        </button>
    );
}
