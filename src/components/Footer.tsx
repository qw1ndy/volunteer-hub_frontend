import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>VolunteerHub</h3>
          <p>
            Об'єднуємо волонтерів та організації для створення кращого світу
          </p>
        </div>

        <div className={styles.footerSection}>
          <h4>Навігація</h4>
          <ul>
            <li>
              <Link to="/">Головна</Link>
            </li>
            <li>
              <Link to="/events">Події</Link>
            </li>
            <li>
              <Link to="/organizations">Організації</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4>Контакти</h4>
          <ul>
            <li>Email: info@volunteerhub.com</li>
            <li>Телефон: +380 44 123 4567</li>
            <li>Адреса: м. Київ, вул. Волонтерська, 1</li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2024 VolunteerHub. Всі права захищені.</p>
      </div>
    </footer>
  );
};

export default Footer;
