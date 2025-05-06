import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { eventService } from "../services/api";
import { Event, EventFilters, PaginationParams } from "../types/api";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/EventsPage.module.css";

const EventsPage: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<EventFilters & PaginationParams>({
    page: 1,
    limit: 10,
    status: "active",
  });

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await eventService.getEvents(filters);
      setEvents(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Помилка при завантаженні подій");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1, // Скидаємо сторінку при зміні фільтрів
    }));
  };

  const handleEventClick = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 mb-4">
          <h1 className="text-center">Події</h1>
        </div>
      </div>

      {/* Фільтри */}
      <div className="row mb-4">
        <div className="col-md-3">
          <select
            className="form-select"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="active">Активні</option>
            <option value="completed">Завершені</option>
            <option value="cancelled">Скасовані</option>
          </select>
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            name="location"
            placeholder="Місце проведення"
            value={filters.location || ""}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            name="dateFrom"
            value={filters.dateFrom || ""}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            name="dateTo"
            value={filters.dateTo || ""}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Список подій */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Завантаження...</span>
          </div>
        </div>
      ) : (
        <div className="list-group">
          {events.map((event) => (
            <div
              key={event.id}
              className={`list-group-item list-group-item-action ${styles.eventItem}`}
              onClick={() => handleEventClick(event.id)}
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{event.name}</h5>
                <small className="text-muted">
                  {formatDate(event.date)} • {event.time}
                </small>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1">
                    <i className="bi bi-geo-alt me-2"></i>
                    {event.location}
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-building me-2"></i>
                    {event.organization.name}
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-people me-2"></i>
                    {event.currentParticipants}/{event.maxParticipants}{" "}
                    учасників
                  </p>
                </div>
                <div className="text-end">
                  <span
                    className={`badge ${
                      event.status === "active"
                        ? "bg-success"
                        : event.status === "completed"
                        ? "bg-secondary"
                        : "bg-danger"
                    }`}
                  >
                    {event.status === "active"
                      ? "Активна"
                      : event.status === "completed"
                      ? "Завершена"
                      : "Скасована"}
                  </span>
                </div>
              </div>
              <p className="mb-1 mt-2">{event.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
