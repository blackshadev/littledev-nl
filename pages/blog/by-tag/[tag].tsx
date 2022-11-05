import { Blog, listBlogsByTag, listTags } from '../../../api/blogs';
import BlogList from '../../../components/Lists/BlogList';

type Props = {
    blogs: Blog[];
};
export default function BlogByTagListPage({ blogs }: Props) {
    return (
        <>
            <h1>Blog posts</h1>
            <BlogList blogs={blogs} />
        </>
    );
}

export async function getStaticProps({
    params: { tag },
}: {
    params: { tag: string };
}): Promise<{
    props: Props;
}> {
    return {
        props: {
            blogs: await listBlogsByTag(tag),
        },
    };
}

export async function getStaticPaths(): Promise<{
    paths: { params: { tag: string } }[];
    fallback: boolean;
}> {
    return {
        paths: (await listTags()).map((tag) => ({
            params: { tag },
        })),

        fallback: false,
    };
}
