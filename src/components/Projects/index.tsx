import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TbClipboardText } from 'react-icons/tb';
import { IDetailedProject, IProject } from '../../App';
import { Project } from '../Project';
import styles from './projects.module.css';
import { useState } from 'react';

interface Props {
  projects: IProject[];
  handleDeleteProject: (id: string) => void;
  handleCompleteProject: (id: string) => void;
  handleInfoProject: (id: string) => Promise<IDetailedProject>;
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: '#262626',
  boxShadow: 24,
  p: 4,
};


export function Projects({projects, handleDeleteProject, handleCompleteProject, handleInfoProject}: Props) {
  const [open, setOpen] = useState(false);
  const [detailedProject, setDetailedProject] = useState({
    id: '',
    title: '',
    cost: '',
    zip_code: '',
    deadline: '',
    done: false,
    createdAt: new Date(),
    location: '',
  });
  const projectQuantity = projects.length;
  const completedProjects = projects.filter((project) => project.done).length;

  async function handleDetailedProject(id: string) {
    const locatedProject = await handleInfoProject(id);
    setDetailedProject(locatedProject);
    setOpen(true)
    return
  }

  const handleClose = () => setOpen(false);
  
  return (
    <section className={styles.projects} >
      <header className={styles.header} >
        <div>
          <p>Created Projects</p>
          <span>{projectQuantity}</span>
        </div>
        <div>
          <p className={styles.purpleText} >Completed</p>
          <span>{completedProjects} of {projectQuantity}</span>
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
          <p className={styles.emptyP} />
        </div>
      )}
      <div className={styles.list} >
        {projects.map((project) => (
          <Project key={project.id} project={project} handleDeleteProject={handleDeleteProject} handleCompleteProject={handleCompleteProject} handleDetailedProject={handleDetailedProject}/>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {detailedProject.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Cost: {detailedProject.cost}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Zip Code: {detailedProject.zip_code}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Location: {detailedProject.location}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Deadline: {detailedProject.deadline.substring(0,10)}
          </Typography>
        </Box>
      </Modal>

    </section>
  )
}