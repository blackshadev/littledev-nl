import Image from 'next/image';
import { Blog, getBlog, listBlogs } from '../../api/blogs';
import WYSIWYG from '../../components/WYSIWYG';
import { formatAsDate } from '../../helpers/datetime';

type Props = {
    blog: Blog;
};
export default function BlogPage({ blog }: Props) {
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

export async function getStaticProps({
    params: { slug },
}: {
    params: { slug: string };
}): Promise<{
    props: Props;
}> {
    return {
        props: {
            blog: await getBlog(slug + '.md'),
        },
    };
}

export async function getStaticPaths(): Promise<{
    paths: { params: { slug: string } }[];
    fallback: boolean;
}> {
    return {
        paths: (await listBlogs()).map((blog) => ({
            params: { slug: blog.slug },
        })),

        fallback: false,
    };
}
