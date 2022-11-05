import getAboutMe, { About } from '../api/aboutMe';
import { Blog, listBlogs } from '../api/blogs';
import getContent, { Content } from '../api/content';
import { listProjects, Project } from '../api/projects';
import AboutMe from '../components/AboutMe/AboutMe';
import BlogCard from '../components/Cards/BlogCard';
import ProjectCard from '../components/Cards/ProjectCard';
import WYSIWYG from '../components/WYSIWYG';

type Props = {
    about: About;
    home: Content;
    blogs: Blog[];
    projects: Project[];
};
export default function HomePage({ about, home, blogs, projects }: Props) {
    return (
        <div className="flex ">
            <article>
                <AboutMe {...about} />
            </article>
            <div className="p-6">
                <h1>Littledev</h1>
                <WYSIWYG>{home.content}</WYSIWYG>
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

export async function getStaticProps(): Promise<{
    props: Props;
}> {
    return {
        props: {
            about: await getAboutMe(),
            home: await getContent('pages/home.md'),
            blogs: (await listBlogs()).slice(0, 2),
            projects: (await listProjects()).slice(0, 2),
        },
    };
}
