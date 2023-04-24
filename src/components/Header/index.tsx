import logo from '../../assets/project-logo.svg';
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
  onLogout: () => void;
}

export function Header({onAddProject, onLogout}: Props) {
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
    // validar pra não aceitar caractere
    setCost(event.target.value.replace(/[^\d]/g, ""));
  }
  function onChangeZipCode(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/\D/g,'')
    value = event.target.value.replace(/(\d{5})(\d)/,'$1-$2')
    setZipCode(value);
  }
  function onChangeDeadline(event: ChangeEvent<HTMLInputElement>) {
    setDeadline(event.target.value);
  }

  return (
    <div>
      <div className={styles.logout}>
        <Logout onLogout={onLogout} />
      </div>
      <header className={styles.header}  >
        <img src={logo} className={styles.logo} alt="" />
        <form onSubmit={handleSubmit} className={styles.newProjectForm}>
          <input type="text" placeholder='Title' onChange={onChangeTitle} value={title} required />
          <input type="text" placeholder='Cost' value={cost} onChange={onChangeCost} required />
          <input type="text" placeholder='Zip Code' maxLength={9} value={zip_code} onChange={onChangeZipCode} required />
          <input type="date" name="deadline" placeholder="Deadline" value={deadline} min={now.toLocaleString()} max="2030-12-31" onChange={onChangeDeadline} required />
          <button type='submit'>
            Create
            <AiOutlinePlusCircle size={20} />
          </button>
        </form>
      </header>
    </div>
  )
}