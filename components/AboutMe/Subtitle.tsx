'use client';

import { ReactNode, useEffect, useState } from 'react';
import { sample } from '../../helpers/random';

export default function Subtitle({
    subtitles,
}: {
    subtitles: { description: string }[];
}): ReactNode {
    const [subtitle, setSubtitle] = useState<string>();
    useEffect(() => {
        setSubtitle(sample(subtitles).description);
    }, [subtitles]);

    return <>{subtitle}</>;
}
