import styles from "./page.module.css";
import Todo from "../components/todo";

export default function Home() {
  return (
    <main className={styles.main}>
      <Todo />
    </main>
  );
}
