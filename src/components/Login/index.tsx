import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './login.module.css';
import { axiosApi } from '../../utils/utils';

interface Props {
  onLogin: (username: string, password: string) => void;
}

export function Login({onLogin}: Props) {

  const [text, setText] = useState('Login');
  const [register, setRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertPassword, setAlertPasword] = useState(false);
  const [alertConfirmPassword, setAlertConfirmPassword] = useState(false);
  const [alertUsernameExists, setAlertUsernameExists] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [successRegister, setSuccessRegister] = useState(false);


  function handleSubmitLogin(event: FormEvent) {
    event.preventDefault();
    onLogin(username, password);
  }

  async function handleSubmitRegister(event: FormEvent) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setAlertConfirmPassword(true);
    } else {
      const newUser = (await axiosApi.post('user', { username, name, password })).data;
      if (newUser.msg) {
        setAlertUsernameExists(true);
      } else {
        setText('Login');
        setRegister(false);
        setSuccessRegister(true);
        setAlertConfirmPassword(false);
        setName('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
      }
    }
  }

  function onChangeName(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
    return
  }
  
  function onRegister() {
    setText('Cadastre-se');
    setRegister(true);
  }

  function backToLogin() {
    setText('Login');
    setRegister(false);
    setName('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  }
  

  return (
    <header className={styles.header} >
      <h1>{text}</h1>
      {register === false && (
        <form onSubmit={handleSubmitLogin} className={styles.loginForm}>
          <input type="text" name='username' placeholder='Username'  onChange={(e) => {
            setUsername(e.target.value);
          }} required />
          <input type="password" name='password' placeholder='Password' onChange={(e) => {
              setPassword(e.target.value);
            }} required />
          <div className={styles.divButton}>
            <button type='submit'>
              Login
            </button>
            <button onClick={onRegister}>
              Cadastrar
            </button> 
          </div>
        </form>
      )}
      {register === true && (
        <form onSubmit={handleSubmitRegister} className={styles.registerForm}>
          <input type="text" name='name' placeholder='Name' value={name} onChange={onChangeName} required />
          <input type="text" name='username' placeholder='Username' 
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setAlertUsernameExists(false);
          }}
            required 
          />
          <input type="password" name='password' placeholder='Password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setAlertPasword(false);
            }}
            required
          />
          {alertPassword && (
            <span className={styles.span}>Senha precisa ter 8 caracteres</span>
          )}
          <input type="password" name='passwordConfirm' placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            required 
          />
          {alertConfirmPassword && (
            <span className={styles.span}>As senhas precisam ser iguais</span>
          )}
          {alertUsernameExists && (
            <span className={styles.span}>Username já existente</span>
          )}
          <div className={styles.divButton}>
            <button onClick={backToLogin}>
              Voltar ao Login
            </button> 
            <button type='submit'>
              Cadastrar
            </button>
          </div>
        </form>
      )}
    </header>
  )
}