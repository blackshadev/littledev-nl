import { ImLink } from 'react-icons/im';
import { SiGithub } from 'react-icons/si';
import { Project } from '../../../api/projects';
import classNames from '../../../helpers/classNames';
import { formatAsDate } from '../../../helpers/datetime';
import CommonCard from '../Common';

type Props = Project & { className?: string; withOverlay?: boolean };
export default function ProjectCard({
    title,
    date,
    description,
    source,
    url,
    className,
    languages,
    tech,
    withOverlay = false,
}: Props) {
    return (
        <CommonCard className={classNames(className)} withOverlay={withOverlay}>
            <header className="flex justify-between">
                <div>
                    <p className="text-sub text-sm dark:text-dark-sub m-0 mb-1">
                        {formatAsDate(date)}
                    </p>
                    <h3 className="m-0 mb-2">{title}</h3>
                </div>
                <div className="flex pt-1">
                    {source && (
                        <a
                            href={source}
                            className="mr-2 text-link dark:text-dark-link"
                            title="Github repository"
                        >
                            <SiGithub size="1.2rem" />
                        </a>
                    )}
                    {url && (
                        <a
                            href={url}
                            className="mr-2 text-link dark:text-dark-link"
                            title="Website link"
                        >
                            <ImLink size="1.2rem" />
                        </a>
                    )}
                </div>
            </header>
            <div className="overflow-hidden flex-shrink">{description}</div>
            {!withOverlay && (
                <div className="flex flex-wrap flex-row">
                    <div className="w-1/2">
                        <h3>Languages</h3>
                        <ul>
                            {languages.map((lang) => (
                                <li key={lang}>{lang}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-1/2">
                        <h3>Tech</h3>
                        <ul>
                            {tech.map((tech) => (
                                <li key={tech}>{tech}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </CommonCard>
    );
}
