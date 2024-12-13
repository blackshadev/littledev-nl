import { ReactNode } from 'react';
import getAboutMe from '../api/aboutMe';
import { listBlogs } from '../api/blogs';
import getContent from '../api/content';
import { listProjects } from '../api/projects';
import AboutMe from '../components/AboutMe/AboutMe';
import BlogCard from '../components/Cards/BlogCard';
import ProjectCard from '../components/Cards/ProjectCard';
import Content from '@/components/Content';

export default async function HomePage(): Promise<ReactNode> {
    const about = await getAboutMe();
    const home = await getContent('pages/home.md');
    const blogs = (await listBlogs()).slice(0, 2);
    const projects = (await listProjects()).slice(0, 2);

    return (
        <div className="flex flex-wrap md:flex-nowrap">
            <article className="max-w-full w-full md:max-w-none md:w-auto">
                <AboutMe {...about} />
            </article>
            <div className="p-6 max-w-full md:max-w-none">
                <h1>Littledev</h1>
                <Content>{home.content}</Content>
                <div className="mt-5 flex flex-wrap flex-row justify-evenly ">
                    <section className="w-full md:w-1/2 pr-6">
                        <h2 className="mt-4 ml-2 mb-2 font-bold">
                            Latest project
                        </h2>
                        <div>
                            {projects.map((project) => (
                                <ProjectCard
                                    className="mb-6 h-40"
                                    withOverlay
                                    key={project.filepath}
                                    {...project}
                                />
                            ))}
                        </div>
                    </section>
                    <section className="w-full md:w-1/2 pl-0 mb:pl-6">
                        <h2 className="mt-4 ml-2 mb-2 font-bold">
                            Latest blogposts
                        </h2>
                        <div>
                            {blogs.map((blog) => (
                                <BlogCard
                                    className="mb-6 h-40"
                                    withOverlay
                                    key={blog.filepath}
                                    {...blog}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
