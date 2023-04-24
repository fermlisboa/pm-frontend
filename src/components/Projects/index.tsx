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
          <p>Projetos criados</p>
          <span>{projectQuantity}</span>
        </div>
        <div>
          <p className={styles.purpleText} >Concluidos</p>
          <span>{completedProjects} de {projectQuantity}</span>
        </div>
      </header>
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

      <div className={styles.list} >
        {projects.map((project) => (
          <Project key={project.id} project={project} handleDeleteProject={handleDeleteProject} handleCompleteProject={handleCompleteProject}/>
        ))}

        {projects.length <= 0 && (
          <section className={styles.emptyProjects}>
            <TbClipboardText size={50} />
            <div>
              <p>Nenhum Projeto criado</p>
              <span>Crie seus Projetos e organize seus prazos</span>
            </div>
          </section>
        )}
      </div>
    </section>
  )
}