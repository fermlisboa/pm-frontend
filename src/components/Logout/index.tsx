import { useEffect, useState } from "react";
import styles from "./logout.module.css";

const LOCAL_STORAGE_KEY = 'SaveProjectsToken';

export default function Logout() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (token) {
      setIsLogged(true);
    }
  }, []);

  function loggedOut() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setIsLogged(false);
  }

  return (
    <div className={styles.logout}>
      <button onClick={loggedOut}>Logout</button>
    </div>
  );
}