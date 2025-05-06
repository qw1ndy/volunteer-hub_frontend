import React, { useState } from "react";
import { Organization } from "../types/organization";
import { organizationService } from "../services/organizationService";
import styles from "../styles/OrganizationCard.module.css";

interface OrganizationCardProps {
  organization: Organization;
  onJoin?: () => void;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({
  organization,
  onJoin,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
    setError(null);
  };

  const handleJoin = async () => {
    try {
      setIsJoining(true);
      setError(null);
      await organizationService.joinOrganization(organization.id);
      if (onJoin) {
        onJoin();
      }
      closeModal();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Помилка при приєднанні до організації"
      );
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <>
      {/* Основна картка */}
      <div className={`card ${styles.card}`} onClick={openModal}>
        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <img
              src={organization.logo}
              alt={`${organization.name} логотип`}
              className={`me-3 ${styles.logo}`}
            />
            <div>
              <h5 className="card-title mb-1">{organization.name}</h5>
              <p className="text-muted mb-0">
                <i className="bi bi-geo-alt me-1"></i>
                {organization.location}
              </p>
            </div>
          </div>
          <p className="card-text text-muted">{organization.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="badge bg-success">
              <i className="bi bi-people me-1"></i>
              {organization.membersCount} учасників
            </span>
            <button className="btn btn-primary btn-sm">Детальніше</button>
          </div>
        </div>
      </div>

      {/* Модальне вікно */}
      {isModalOpen && (
        <div
          className={`modal fade show ${styles.modal}`}
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <div className="d-flex align-items-center">
                  <img
                    src={organization.logo}
                    alt={`${organization.name} логотип`}
                    className={`me-3 ${styles.modalLogo}`}
                  />
                  <div>
                    <h5 className="modal-title">{organization.name}</h5>
                    <p className="text-muted mb-0">
                      <i className="bi bi-geo-alt me-1"></i>
                      {organization.location}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <div className="row">
                  <div className="col-md-8">
                    <h6 className="mb-3">Про організацію</h6>
                    <p>{organization.description}</p>
                  </div>
                  <div className="col-md-4">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">Статистика</h6>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Учасників:</span>
                          <span className="fw-bold">
                            {organization.membersCount}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Рейтинг:</span>
                          <span className="fw-bold">
                            {organization.rating}/5
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Закрити
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleJoin}
                  disabled={isJoining}
                >
                  {isJoining ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Завантаження...
                    </>
                  ) : (
                    "Приєднатися"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrganizationCard;
