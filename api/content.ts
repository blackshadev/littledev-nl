import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export const CONTENT_DIR = path.join(process.cwd(), 'content');

export type Content<T = {}> = T & {
    content: string;
    filepath: string;
    title: string;
    description: string;
};

export default async function getContent<T>(
    filepath: string
): Promise<Content<T>> {
    const fileContents = await fs.promises.readFile(
        `${CONTENT_DIR}/${filepath}`,
        'utf8'
    );

    try {
        const { data, content } = matter(fileContents);

        const result = await remark().use(html).process(content);
        return {
            ...data,
            content: result.toString(),
            filepath: filepath,
        } as unknown as Content<T>;
    } catch (err) {
        throw new Error(`Error during parsing ${path}: ${err}`);
    }
}
