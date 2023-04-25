import profile from '../../assets/profile.svg';
import styles from "./logout.module.css";

interface Props {
  onLogout: () => void;
}

const localName = localStorage.getItem('name');

const name = localName ? formatName(localName) : '';

function formatName(name: string): string {
  return name[0].toUpperCase() + name.substring(1);
}

export default function Logout({onLogout}: Props) {
  return (
    <div className={styles.logout}>
      <img src={profile} className={styles.profile} alt="logo" />
      <div className={styles.project} >
        {name}
      </div>
      <div className={styles.divButton}>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}