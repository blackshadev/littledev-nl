import { Blog, listBlogsByTag, listTags } from '@/api/blogs';
import BlogList from '@/components/Lists/BlogList';

type Props = {
    params: { tag: string };
};
export default async function BlogByTagListPage({ params: { tag } }: Props) {
    const blogs = await listBlogsByTag(tag);
    return (
        <>
            <h1>Blog posts</h1>
            <BlogList blogs={blogs} />
        </>
    );
}

export async function generateStaticParams() {
    return (await listTags()).map((tag) => ({ tag }));
}
