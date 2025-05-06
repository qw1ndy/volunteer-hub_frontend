import React, { useState } from "react";
import styles from "../styles/EventCard.module.css";

interface EventCardProps {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  organization: string;
  description: string;
  detailedDescription: string;
  requirements: string;
  contactPerson: string;
  contactEmail: string;
  imageUrl: string;
  comments: {
    id: number;
    author: string;
    date: string;
    text: string;
  }[];
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  name,
  date,
  time,
  location,
  organization,
  description,
  detailedDescription,
  requirements,
  contactPerson,
  contactEmail,
  imageUrl,
  comments,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      {/* Основна картка (клікабельна) */}
      <div className={`card ${styles.eventCard}`} onClick={openModal}>
        <img src={imageUrl} alt={name} className={styles.cardImage} />
        <div className={styles.cardBody}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className={styles.eventTitle}>{name}</h5>
            <span className="badge bg-primary">{organization}</span>
          </div>

          <div className="d-flex align-items-center text-muted mb-2">
            <i className="bi bi-calendar-event me-2"></i>
            {date} • {time}
          </div>

          <div className="d-flex align-items-center text-muted mb-3">
            <i className="bi bi-geo-alt me-2"></i>
            {location}
          </div>

          <p className={styles.eventDescription}>{description}</p>

          <div className="text-primary small">Натисніть для деталей</div>
        </div>
      </div>

      {/* Модальне вікно */}
      {isModalOpen && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={closeModal}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={imageUrl}
                  alt={name}
                  className="img-fluid rounded mb-4"
                />

                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3">
                      <i className="bi bi-calendar-event me-2"></i>
                      <span>
                        <strong>Дата:</strong> {date}
                      </span>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <i className="bi bi-clock me-2"></i>
                      <span>
                        <strong>Час:</strong> {time}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-geo-alt me-2"></i>
                      <span>
                        <strong>Місце:</strong> {location}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start mb-3">
                      <i className="bi bi-info-circle me-2 mt-1"></i>
                      <div>
                        <strong>Вимоги:</strong>
                        <p className="mb-0">{requirements}</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-envelope me-2"></i>
                      <span>
                        <strong>Контакт:</strong> {contactPerson} (
                        {contactEmail})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="mb-2">Про подію</h6>
                  <p>{detailedDescription}</p>
                </div>

                <button className="btn btn-success w-100 mb-4">
                  Зареєструватися як волонтер
                </button>

                {/* Секція коментарів */}
                <div className="border-top pt-4">
                  <h6 className="mb-3">Коментарі ({comments.length})</h6>

                  {comments.map((comment) => (
                    <div key={comment.id} className="mb-3 pb-3 border-bottom">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="fw-medium">{comment.author}</span>
                        <span className="text-muted small">{comment.date}</span>
                      </div>
                      <p className="mb-0">{comment.text}</p>
                    </div>
                  ))}

                  {/* Форма додавання коментаря */}
                  <div className="mt-4">
                    <h6 className="mb-2">Додати коментар</h6>
                    <div className="d-flex">
                      <input
                        type="text"
                        placeholder="Напишіть ваш коментар..."
                        className="form-control me-2"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <button
                        className="btn btn-primary"
                        disabled={!newComment.trim()}
                      >
                        Опублікувати
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventCard;
