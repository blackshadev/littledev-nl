import getAboutMe from '@/api/aboutMe';
import AboutMe from '@/components/AboutMe/AboutMe';
import Content from '@/components/Content';
import { ReactNode } from 'react';

export default async function AboutPage(): Promise<ReactNode> {
    const about = await getAboutMe();
    return (
        <div className="flex flex-wrap md:flex-nowrap">
            <article className="w-full md:w-auto">
                <AboutMe {...about} />
            </article>
            <div className="p-6">
                <h1>About me</h1>
                <Content>{about.content}</Content>
                <div className="mt-5 flex flex-wrap flex-row justify-evenly">
                    <section className="pr-6 w-full md:w-auto">
                        <h2 className="mb-2">Languages</h2>
                        <ul className="list-disc ml-6 mt-3">
                            {about.skills
                                .filter((skill) => skill.type === 'language')
                                .map((skill) => (
                                    <li key={skill.description}>
                                        {skill.description}
                                    </li>
                                ))}
                        </ul>
                    </section>
                    <section className="pl-0 mb:pl-6  w-full md:w-auto">
                        <h2 className="mb-2">Frameworks</h2>
                        <ul className="list-disc ml-6 mt-3">
                            {about.skills
                                .filter((skill) => skill.type === 'framework')
                                .map((skill) => (
                                    <li key={skill.description}>
                                        {skill.description}
                                    </li>
                                ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
