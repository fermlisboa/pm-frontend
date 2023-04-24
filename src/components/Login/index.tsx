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
  const [alertPassword, setAlertPassword] = useState(false);
  const [alertConfirmPassword, setAlertConfirmPassword] = useState(false);
  const [alertUsernameExists, setAlertUsernameExists] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


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

  function verifyPassword(password: string) {
    if (password.length < 8) {
      setAlertPassword(true);
    } else {
      setAlertPassword(false);
    }
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
              Register
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
              verifyPassword(e.target.value);
              setAlertConfirmPassword(false);
            }}
            required
          />
          {alertPassword && (
            <span className={styles.span}>Your password must be at least 8 characters long</span>
          )}
          <input type="password" name='passwordConfirm' placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setAlertConfirmPassword(false);
            }}
            required 
          />
          {alertConfirmPassword && (
            <span className={styles.span}>Passwords must match</span>
          )}
          {alertUsernameExists && (
            <span className={styles.span}>Username already exists</span>
          )}
          <div className={styles.divButton}>
            <button onClick={backToLogin}>
              Back to Login
            </button> 
            <button type='submit'>
              Register
            </button>
          </div>
        </form>
      )}
    </header>
  )
}