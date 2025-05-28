import styles from "./portfolio.module.css";

const Portfolio = () => {
  return (
    <section className={styles.portfolio}>
      <h2>Portfolio</h2>
      <div className={styles.projects}>
        <div className={styles.project}>Project 1</div>
        <div className={styles.project}>Project 2</div>
        <div className={styles.project}>Project 3</div>
      </div>
    </section>
  );
};

export default Portfolio;
