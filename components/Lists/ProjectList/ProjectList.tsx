import { Project } from '../../../api/projects';
import classNames from '../../../helpers/classNames';
import ProjectCard from '../../Cards/ProjectCard';

type Props = { projects: Project[]; className?: string };
export default function ProjectList({ projects, className }: Props) {
    return (
        <section className={classNames('grid gap-4 md:grid-cols-2', className)}>
            {projects.map((project) => (
                <ProjectCard key={project.filepath} {...project} />
            ))}
        </section>
    );
}
