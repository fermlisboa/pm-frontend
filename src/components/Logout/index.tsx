import styles from "./logout.module.css";

interface Props {
  onLogout: () => void;
}

export default function Logout({onLogout}: Props) {
  return (
    <div className={styles.logout}>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}