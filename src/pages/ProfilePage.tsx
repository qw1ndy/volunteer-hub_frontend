import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/ProfilePage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  const userData = {
    name: user.name,
    location: user.location || "Не вказано",
    bio: user.bio || "Немає опису",
    stats: {
      events: 24,
      hours: 156,
      organizations: 8,
    },
    skills: [
      "Екологія",
      "Організація подій",
      "Робота з тваринами",
      "Перша допомога",
    ],
    events: [
      {
        title: "Прибирання парку",
        date: "15 травня 2024",
        status: "active",
      },
      {
        title: "Допомога безпритульним тваринам",
        date: "20 травня 2024",
        status: "active",
      },
      {
        title: "Екологічний фестиваль",
        date: "10 квітня 2024",
        status: "completed",
      },
    ],
  };

  return (
    <div className={styles.profileContainer}>
      <div className="container">
        <div className={styles.profileHeader}>
          <div className="row align-items-center">
            <div className="col-auto">
              <img
                src={user.avatar || "/default-avatar.jpg"}
                alt="Profile"
                className={styles.profileImage}
              />
            </div>
            <div className="col">
              <div className={styles.profileInfo}>
                <h1 className={styles.profileName}>{userData.name}</h1>
                <p className={styles.profileLocation}>
                  <i className="bi bi-geo-alt me-2"></i>
                  {userData.location}
                </p>
                <p className={styles.profileBio}>{userData.bio}</p>

                <div className={styles.profileStats}>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>
                      {userData.stats.events}
                    </div>
                    <div className={styles.statLabel}>Подій</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>
                      {userData.stats.hours}
                    </div>
                    <div className={styles.statLabel}>Годин</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>
                      {userData.stats.organizations}
                    </div>
                    <div className={styles.statLabel}>Організацій</div>
                  </div>
                </div>

                <div className={styles.profileActions}>
                  <button className={styles.editButton}>
                    <i className="bi bi-pencil me-2"></i>
                    Редагувати профіль
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <h2 className={styles.sectionTitle}>Мої навички</h2>
            <div className={styles.skillsList}>
              {userData.skills.map((skill, index) => (
                <span key={index} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <h2 className={styles.sectionTitle}>Мої події</h2>
            {userData.events.map((event, index) => (
              <div key={index} className={styles.eventCard}>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.eventDate}>
                  <i className="bi bi-calendar-event me-2"></i>
                  {event.date}
                </p>
                <span
                  className={`${styles.eventStatus} ${
                    styles[
                      `status${
                        event.status.charAt(0).toUpperCase() +
                        event.status.slice(1)
                      }`
                    ]
                  }`}
                >
                  {event.status === "active" ? "Активна" : "Завершена"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
