import styles from "./skills.module.css";

const Skills = () => {
  return (
    <section className={styles.skills}>
      <h2>Skills</h2>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
        <li>React</li>
        <li>Next.js</li>
      </ul>
    </section>
  );
};

export default Skills;
