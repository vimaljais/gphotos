import styles from "../styles/Home.module.css";
import Aww from "../components/Aww";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Testing</h1>
        {/* <audio ref="audio_tag" src="/api/getAudio/" controls autoPlay/> */}
      </div>
      <Aww />
    </div>
  );
}
