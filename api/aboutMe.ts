import getContent, { Content } from './content';

export type About = Content<{
    name: string;
    subtitles: { description: string }[];
    skills: { type: 'language' | 'framework'; description: string }[];
    dob: string;
    image: string;
}>;

const ABOUT_ME_PATH = `pages/about.md`;

export default async function getAboutMe(): Promise<Content<About>> {
    return await getContent(ABOUT_ME_PATH);
}
