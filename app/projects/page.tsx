import { listProjects, Project } from '@/api/projects';
import ProjectsWithFilters from './ProjectsWithFilters';

type Props = {
    projects: Project[];
};

export default async function ProjectListPage() {
    const projects = await listProjects();

    return (
        <section className="mx-4 grid grid-cols-4 gap-4">
            <h1 className="w-full col-span-full">Projects</h1>
            <ProjectsWithFilters projects={projects} />
        </section>
    );
}
