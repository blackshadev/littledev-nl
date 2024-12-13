import { ReactNode } from 'react';
import { Blog } from '../../../api/blogs';
import BlogCard from '../../Cards/BlogCard';

type Props = { blogs: Blog[] };
export default function BlogList({ blogs }: Props): ReactNode {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            {blogs.map((blog) => (
                <BlogCard key={blog.filepath} {...blog} />
            ))}
        </div>
    );
}
