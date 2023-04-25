import styles from './project.module.css';
import { TbTrash, TbInfoCircleFilled, TbEditCircle } from 'react-icons/tb';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { IDetailedProject } from '../../App';

export interface IProject {
  id?: string;
  title: string;
  cost: string;
  zip_code: string;
  deadline: string;
  done?: boolean;
  createdAt?: Date;
}

interface Props {
  project: IProject;
  handleDeleteProject: (id: string) => void;
  handleCompleteProject: (id: string) => void;
  handleDetailedProject: (id: string) => void;
}

export function Project({project, handleDeleteProject, handleCompleteProject, handleDetailedProject}: Props) {

  return (
    <div className={styles.project} >
      <div className={styles.projectDivCheck}>
        <button className={styles.checkBox} onClick={() => handleCompleteProject(project.id ? project.id : '')} >
          {project.done ? <BsFillCheckCircleFill />  : <div/>}
        </button>
      </div>

      <div className={styles.projectDiv}>
        <p className={ project.done ? styles.completedText : '' } >
          {project.title}
        </p>
      </div>
      <div className={styles.projectDiv}>
        <p className={ project.done ? styles.completedText : '' } >
          R$ {project.cost}
        </p>
      </div>
      <div className={styles.projectDiv}>
        <p className={ project.done ? styles.completedText : '' } >
          {project.zip_code}
        </p>
      </div>
      <div className={styles.projectDiv}>
        <p className={ project.done ? styles.completedText : '' } >
          {project.deadline.substring(0,10)}
        </p>
      </div>

      <div className={styles.projectDivButton}>
        <button className={styles.deleteButton} onClick={() => handleDetailedProject(project.id ? project.id : '')}>
          <TbInfoCircleFilled size={15} />
        </button>
      </div>

      {/* <div className={styles.projectDivButton}>
        <button className={styles.deleteButton} onClick={() => handleDetailedProject(project.id ? project.id : '')}>
          <TbEditCircle size={15} />
        </button>
      </div> */}

      <div className={styles.projectDivButton}>
        <button className={styles.deleteButton} onClick={() => handleDeleteProject(project.id ? project.id : '')}>
          <TbTrash size={15} />
        </button>
      </div>
    </div>
  )
}