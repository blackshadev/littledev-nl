import { useEffect, useMemo, useState } from 'react';
import { listProjects, Project } from '../api/projects';
import Filters from '../components/Filters';
import ProjectList from '../components/Lists/ProjectList';

type Props = {
    projects: Project[];
};

function getFrequencies(values: string[]): { value: string; count: number }[] {
    const frequencies: { [value: string]: number } = {};
    for (const value of values) {
        frequencies[value] = frequencies[value] ?? 0;
        frequencies[value] += 1;
    }

    return Object.entries(frequencies)
        .map(([value, count]) => ({
            value,
            count,
        }))
        .sort((a, b) => b.count - a.count);
}

export default function ProjectListPage({ projects }: Props) {
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const languages = useMemo(() => {
        return getFrequencies(projects.flatMap((project) => project.languages));
    }, [projects]);
    const technologies = useMemo(() => {
        return getFrequencies(
            projects.flatMap((project) => project.tech).sort()
        );
    }, [projects]);
    const [selected, setSelected] = useState<
        { type: 'languages' | 'tech'; value: string } | undefined
    >();
    useEffect(() => {
        if (!selected) {
            return setFilteredProjects(projects);
        }

        setFilteredProjects(
            projects.filter((project) =>
                (project[selected.type] ?? []).includes(selected.value)
            )
        );
    }, [selected, projects]);

    return (
        <section className="mx-4 grid grid-cols-4 gap-4">
            <h1 className="w-full col-span-full">Projects</h1>
            <aside role="search" className="mb-4 col-span-full lg:col-span-1">
                <h3>Languages</h3>
                <Filters
                    values={languages}
                    onSelect={(value) =>
                        setSelected(
                            value ? { type: 'languages', value } : undefined
                        )
                    }
                    selectedValue={
                        selected?.type === 'languages'
                            ? selected.value
                            : undefined
                    }
                />
                <h3>Technologies</h3>
                <Filters
                    values={technologies}
                    onSelect={(value) =>
                        setSelected(value ? { type: 'tech', value } : undefined)
                    }
                    selectedValue={
                        selected?.type === 'tech' ? selected.value : undefined
                    }
                />
            </aside>
            <ProjectList
                projects={filteredProjects}
                className="col-span-full lg:col-span-3"
            />
        </section>
    );
}

export async function getStaticProps(): Promise<{
    props: Props;
}> {
    return {
        props: {
            projects: await listProjects(),
        },
    };
}
