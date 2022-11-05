import { useState } from 'react';
import { Project } from '../../../api/projects';
import ProjectCard from '../../Cards/ProjectCard';

type Props = { projects: Project[] };
export default function ProjectList({ projects }: Props) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
                <ProjectCard key={project.filepath} {...project} />
            ))}
        </div>
    );
}
