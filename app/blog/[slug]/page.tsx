import { getBlog, listBlogs } from '@/api/blogs';
import Content from '@/components/Content';
import { formatAsDate } from '@/helpers/datetime';
import { ReactNode } from 'react';
import Image from 'next/image';

type Props = {
    params: Promise<{ slug: string }>;
};
export default async function BlogPage(props: Props): Promise<ReactNode> {
    const { slug } = await props.params;

    const blog = await getBlog(slug + '.md');

    return (
        <article className="mx-0 sm:mx-5 md:mx-20">
            <header>
                {blog.image && (
                    <div className="relative w-full md:h-96 h-32 mb-6">
                        <Image
                            src={`/assets/images/blogs/${blog.image}`}
                            alt={blog.title}
                            fill
                            className="object-cover shadow rounded"
                        />
                    </div>
                )}
                <p>{formatAsDate(blog.date)}</p>
                <h1>{blog.title}</h1>
            </header>

            <div>
                <p>{blog.description}</p>
                <Content>{blog.content}</Content>
            </div>
        </article>
    );
}
export async function generateStaticParams(): Promise<{ slug: string }[]> {
    return (await listBlogs()).map((blog) => ({ slug: blog.slug }));
}
