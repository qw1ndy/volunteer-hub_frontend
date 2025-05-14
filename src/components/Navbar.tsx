import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/Navbar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthForm from "./AuthForm";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link to="/" className={styles.logo}>
          VolunteerHub
        </Link>

        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>
            Головна
          </Link>
          <Link to="/events" className={styles.navLink}>
            Події
          </Link>
          <Link to="/organizations" className={styles.navLink}>
            Організації
          </Link>
        </div>

        <div className={styles.authSection}>
          {user ? (
            <div className={styles.userMenu}>
              <Link to="/profile" className={styles.profileLink}>
                <img
                  src={user.avatar || "/default-avatar.jpg"}
                  alt={user.name}
                  className={styles.avatar}
                />
                <span className={styles.userName}>{user.name}</span>
              </Link>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Вийти
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className={styles.authButton}
            >
              Увійти
            </button>
          )}
        </div>
      </div>

      {showAuthModal && <AuthForm onClose={() => setShowAuthModal(false)} />}
    </nav>
  );
};

export default Navbar;
