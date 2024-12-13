import path from 'path';
import fs from 'fs';
import getContent, { Content, CONTENT_DIR } from './content';

export type Project = Content<{
    title: string;
    date: string;
    source?: string;
    url?: string;
    languages: string[];
    tech: string[];
}>;

const PROJECT_PATH = `projects`;

export async function getProject(filePath: string): Promise<Project> {
    const parsed = await getContent<Project>(path.join(PROJECT_PATH, filePath));

    return {
        ...parsed,
        tech: parsed.tech ?? [],
        languages: parsed.languages ?? [],
    };
}

export async function listProjects(): Promise<Project[]> {
    const filePaths = await fs.promises.readdir(
        path.join(CONTENT_DIR, PROJECT_PATH)
    );

    const all = await Promise.all(
        filePaths
            .filter((filePath) => filePath.endsWith('.md'))
            .map((filePath) => getProject(filePath))
    );

    return all.sort((a, b) => (a.date > b.date ? -1 : b.date > a.date ? 1 : 0));
}
