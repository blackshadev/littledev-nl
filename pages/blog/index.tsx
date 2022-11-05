import { Blog, listBlogs } from '../../api/blogs';
import BlogList from '../../components/Lists/BlogList';

type Props = {
    blogs: Blog[];
};
export default function BlogListPage({ blogs }: Props) {
    return (
        <>
            <h1>Blog posts</h1>
            <BlogList blogs={blogs} />
        </>
    );
}

export async function getStaticProps(): Promise<{
    props: Props;
}> {
    return {
        props: {
            blogs: await listBlogs(),
        },
    };
}
