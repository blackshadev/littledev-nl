import { ReactNode } from 'react';
import { Blog } from '../../../api/blogs';
import classNames from '../../../helpers/classNames';
import { formatAsDate } from '../../../helpers/datetime';
import ucFirst from '../../../helpers/ucFirst';
import Link from '../../Link';
import CommonCard from '../Common';

type Props = Blog & { className?: string; withOverlay?: boolean };
export default function BlogCard({
    title,
    date,
    tags,
    slug,
    description,
    className,
    withOverlay = false,
}: Props): ReactNode {
    return (
        <CommonCard className={classNames(className)} withOverlay={withOverlay}>
            <header className="mb-4">
                <p className="text-sub text-sm dark:text-dark-sub m-0  mb-1">
                    {formatAsDate(date)}
                </p>
                <h3 className="m-0 mb-2">
                    <Link href={`/blog/${slug}`}>{title}</Link>
                </h3>
                <div>
                    {tags.map((tag) => (
                        <Link
                            key={tag.tag}
                            href={`/blog/by-tag/${tag.tag}`}
                            className="mr-1 p-1 bg-tag dark:bg-dark-tag rounded first-letter:uppercase"
                        >
                            {ucFirst(tag.tag)}
                        </Link>
                    ))}
                </div>
            </header>
            <div className="overflow-hidden flex-shrink">{description}</div>
        </CommonCard>
    );
}
