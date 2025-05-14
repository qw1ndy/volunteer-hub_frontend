import React from "react";
import styles from "../styles/HomePage.module.css";

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Ласкаво просимо до VolunteerHub</h1>
          <p>
            Об'єднуємо волонтерів та організації для створення кращого світу
          </p>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.feature}>
          <h2>Знаходьте події</h2>
          <p>
            Переглядайте та приєднуйтесь до волонтерських подій у вашому місті
          </p>
        </div>
        <div className={styles.feature}>
          <h2>Створюйте події</h2>
          <p>Організовуйте власні волонтерські заходи та залучайте учасників</p>
        </div>
        <div className={styles.feature}>
          <h2>Розвивайтеся</h2>
          <p>Отримуйте досвід, нові навички та знайомтеся з однодумцями</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
