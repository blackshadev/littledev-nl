import { listBlogsByTag, listTags } from '@/api/blogs';
import BlogList from '@/components/Lists/BlogList';
import { ReactNode } from 'react';

type Props = {
    params: Promise<{ tag: string }>;
};
export default async function BlogByTagListPage(
    props: Props
): Promise<ReactNode> {
    const { tag } = await props.params;

    const blogs = await listBlogsByTag(tag);
    return (
        <>
            <h1>Blog posts</h1>
            <BlogList blogs={blogs} />
        </>
    );
}

export async function generateStaticParams(): Promise<{ tag: string }[]> {
    return (await listTags()).map((tag) => ({ tag }));
}
