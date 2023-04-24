import { TbClipboardText } from 'react-icons/tb';
import { IProject } from '../../App';
import { Project } from '../Project';
import styles from './projects.module.css';

interface Props {
  projects: IProject[];
  handleDeleteProject: (id: string) => void;
  handleCompleteProject: (id: string) => void;
}

export function Projects({projects, handleDeleteProject, handleCompleteProject}: Props) {
  const projectQuantity = projects.length;
  const completedProjects = projects.filter((project) => project.done).length;

  return (
    <section className={styles.projects} >
      <header className={styles.header} >
        <div>
          <p>Created Projects</p>
          <span>{projectQuantity}</span>
        </div>
        <div>
          <p className={styles.purpleText} >Completed</p>
          <span>{completedProjects} de {projectQuantity}</span>
        </div>
      </header>

      {projects.length > 0 && (
        <div className={styles.listTitle} >
          <div className={styles.emptyP}>
            <p></p>
          </div>
          <div className={styles.divP}>
            <p>Title</p>
          </div>
          <div className={styles.divP}>
            <p>Cost</p>
          </div>
          <div className={styles.divP}>
            <p>Zip Code</p>
          </div>
          <div className={styles.divP}>
            <p>Deadline</p>
          </div>
          <p className={styles.emptyP} />
        </div>
      )}
      <div className={styles.list} >
        {projects.map((project) => (
          <Project key={project.id} project={project} handleDeleteProject={handleDeleteProject} handleCompleteProject={handleCompleteProject}/>
        ))}

        {projects.length <= 0 && (
          <section className={styles.emptyProjects}>
            <TbClipboardText size={50} />
            <div>
              <p>You don't have any projects</p>
              <span>Create your projects, make your schedule </span>
            </div>
          </section>
        )}
      </div>
    </section>
  )
}