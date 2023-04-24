import { AiOutlinePlusCircle } from 'react-icons/ai';

import styles from './header.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import Logout from '../Logout';

interface IProject {
  title: string;
  cost: string;
  zip_code: string;
  deadline: string;
}
interface Props {
  onAddProject: (project: IProject) => void;
}

export function Header({onAddProject}: Props) {
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('');
  const [zip_code, setZipCode] = useState('');
  const [deadline, setDeadline] = useState('');

  const now = new Date();

  function handleSubmit(event: FormEvent) {
    const project: IProject = {
      title: title,
      cost: cost,
      zip_code: zip_code,
      deadline: deadline,
    }
    event.preventDefault();
    onAddProject(project);
    setTitle('');
    setCost('');
    setZipCode('');
    setDeadline('');
  }

  function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }
  function onChangeCost(event: ChangeEvent<HTMLInputElement>) {
    setCost(event.target.value);
  }
  function onChangeZipCode(event: ChangeEvent<HTMLInputElement>) {
    setZipCode(event.target.value);
  }
  function onChangeDeadline(event: ChangeEvent<HTMLInputElement>) {
    setDeadline(event.target.value);
  }

  return (
    <div>
      <div className={styles.main}>
        <Logout />
      </div>
      <header className={styles.header} >
        <h1>Projetos</h1>
        <form onSubmit={handleSubmit} className={styles.newProjectForm}>
          <input type="text" placeholder='Title' onChange={onChangeTitle} value={title} required />
          <input type="text" placeholder='Cost' value={cost} onChange={onChangeCost} required />
          <input type="text" placeholder='Zip Code' value={zip_code} onChange={onChangeZipCode} required />
          <input type="date" name="deadline" placeholder="Deadline" value={deadline} min={now.toLocaleString()} max="2030-12-31" onChange={onChangeDeadline} required />
          <button type='submit'>
            Criar
            <AiOutlinePlusCircle size={20} />
          </button>
        </form>
      </header>
    </div>
  )
}