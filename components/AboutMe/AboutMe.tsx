import Image from 'next/image';
import { useEffect, useState } from 'react';
import { About } from '../../api/aboutMe';
import { formatAsDate } from '../../helpers/datetime';
import { sample } from '../../helpers/random';

type Props = About;
export default function AboutMe({ name, image, subtitles, dob }: Props) {
    const [subtitle, setSubtitle] = useState<string>();
    useEffect(() => {
        setSubtitle(sample(subtitles).description);
    }, [subtitles]);
    return (
        <div className="flex items-center flex-col mx-3">
            <div className="rounded-full w-48 h-48 overflow-hidden mb-3">
                <Image
                    width={194}
                    height={194}
                    src={image}
                    alt="This is me"
                    className="w-full h-full"
                />
            </div>
            <p className="m-0">{name}</p>
            <p className="m-0 text-sub dark:text-dark-sub">{subtitle}</p>
            <p className="m-0 text-sub dark:text-dark-sub text-sm">
                {formatAsDate(dob)}
            </p>
        </div>
    );
}
