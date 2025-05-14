import React from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/UserProfile.module.css";
import { InfoResponse } from "../types/auth";

const UserProfile: React.FC = () => {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <div className={styles.loading}>Завантаження...</div>;
  }

  if (!user) {
    return <div className={styles.error}>Користувача не знайдено</div>;
  }

  const userData = user as InfoResponse;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.avatarContainer}>
          <img
            src={userData.avatar || "https://via.placeholder.com/150"}
            alt={userData.name}
            className={styles.avatar}
          />
        </div>
        <div className={styles.userInfo}>
          <h1>{userData.name}</h1>
          <p className={styles.email}>{userData.email}</p>
          {userData.location && (
            <p className={styles.location}>{userData.location}</p>
          )}
        </div>
      </div>

      {userData.bio && (
        <div className={styles.section}>
          <h2>Про себе</h2>
          <p>{userData.bio}</p>
        </div>
      )}

      {userData.skills && userData.skills.length > 0 && (
        <div className={styles.section}>
          <h2>Навички</h2>
          <div className={styles.skills}>
            {userData.skills.map((skill, index) => (
              <span key={index} className={styles.skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {userData.stats && (
        <div className={styles.section}>
          <h2>Статистика</h2>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{userData.stats.events}</span>
              <span className={styles.statLabel}>Подій</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{userData.stats.hours}</span>
              <span className={styles.statLabel}>Годин</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                {userData.stats.organizations}
              </span>
              <span className={styles.statLabel}>Організацій</span>
            </div>
          </div>
        </div>
      )}

      <button onClick={logout} className={styles.logoutButton}>
        Вийти
      </button>
    </div>
  );
};

export default UserProfile;
