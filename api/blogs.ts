import path from 'path';
import fs from 'fs';
import getContent, { Content, CONTENT_DIR } from './content';

export type Blog = Content<{
    title: string;
    state: 'Draft' | 'Published';
    slug: string;
    image?: string;
    description: string;
    date: string;
    tags: { tag: string }[];
}>;

const BLOG_PATH = `blog/posts`;

export async function getBlog(filePath: string): Promise<Blog> {
    const parsed = await getContent<Blog>(path.join(BLOG_PATH, filePath));

    return {
        ...parsed,
        slug: filePath.replace('.md', ''),
        tags: parsed.tags ?? [],
    };
}

export async function listBlogs(): Promise<Blog[]> {
    const filePaths = await fs.promises.readdir(
        path.join(CONTENT_DIR, BLOG_PATH)
    );

    const all = await Promise.all(
        filePaths
            .filter((filePath) => filePath.endsWith('.md'))
            .map((filePath) => getBlog(filePath))
    );

    return all.sort((a, b) => (a.date > b.date ? -1 : b.date > a.date ? 1 : 0));
}

export async function listBlogsByTag(tag: string): Promise<Blog[]> {
    const blogs = await listBlogs();

    return blogs.filter((blog) =>
        blog.tags.map((tag) => tag.tag).includes(tag)
    );
}

export async function listTags(): Promise<string[]> {
    const blogs = await listBlogs();
    return [
        ...new Set(blogs.flatMap((blog) => blog.tags.map((tag) => tag.tag))),
    ];
}
