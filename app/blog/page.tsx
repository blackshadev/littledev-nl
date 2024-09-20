import { Blog, listBlogs } from '../../api/blogs';
import BlogList from '../../components/Lists/BlogList';

export default async function BlogListPage() {
    const blogs = await listBlogs();
    return (
        <>
            <h1>Blog posts</h1>
            <BlogList blogs={blogs} />
        </>
    );
}
