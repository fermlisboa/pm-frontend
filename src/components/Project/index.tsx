import styles from './project.module.css';
import { TbTrash } from 'react-icons/tb';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useEffect } from 'react';

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
}

export function Project({project, handleDeleteProject, handleCompleteProject}: Props) {

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
          {project.cost}
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
        <button className={styles.deleteButton} onClick={() => handleDeleteProject(project.id ? project.id : '')}>
          <TbTrash size={20} />
        </button>
      </div>
    </div>
  )
}