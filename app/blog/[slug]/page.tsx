import Image from 'next/image';
import { Blog, getBlog, listBlogs } from '@/api/blogs';
import WYSIWYG from '@/components/WYSIWYG';
import { formatAsDate } from '@/helpers/datetime';

type Props = {
    params: { slug: string };
};
export default async function BlogPage({ params: { slug } }: Props) {
    const blog = await getBlog(slug + '.md');

    return (
        <article className="mx-0 sm:mx-5 md:mx-20">
            <header>
                {blog.image && (
                    <div className="relative w-full md:h-96 h-32 mb-6">
                        <Image
                            src={require(`/assets/images/blogs/${blog.image}`)}
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
                <WYSIWYG>{blog.content}</WYSIWYG>
            </div>
        </article>
    );
}
export async function generateStaticParams() {
    return (await listBlogs()).map((blog) => ({ slug: blog.slug }));
}
