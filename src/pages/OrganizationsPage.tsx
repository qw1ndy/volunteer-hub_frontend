import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import OrganizationCard from "../components/OrganizationCard";
import { organizationService } from "../services/organizationService";
import { Organization } from "../types/organization";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/OrganizationsPage.module.css";

interface OrganizationFilters {
  search: string;
  location: string;
  sortBy: "name" | "rating" | "membersCount";
}

const OrganizationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<OrganizationFilters>({
    search: "",
    location: "",
    sortBy: "name",
  });

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        const data = await organizationService.getOrganizations(filters);
        setOrganizations(data);
        setError(null);
      } catch (err) {
        setError("Не вдалося завантажити організації");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, [filters]);

  const handleFilterChange = (
    key: keyof OrganizationFilters,
    value: string
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleOrganizationClick = (organizationId: string) => {
    navigate(`/organizations/${organizationId}`);
  };

  return (
    <main className="container py-4">
      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className={`form-control ${styles.formControl}`}
            placeholder="Пошук організацій..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className={`form-control ${styles.formControl}`}
            placeholder="Місцезнаходження"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className={`form-select ${styles.formSelect}`}
            value={filters.sortBy}
            onChange={(e) =>
              handleFilterChange(
                "sortBy",
                e.target.value as OrganizationFilters["sortBy"]
              )
            }
          >
            <option value="name">За назвою</option>
            <option value="rating">За рейтингом</option>
            <option value="membersCount">За кількістю учасників</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center">
          <div
            className={`spinner-border ${styles.spinnerBorder}`}
            role="status"
          >
            <span className="visually-hidden">Завантаження...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {organizations.map((org) => (
            <div key={org.id} className="col">
              <OrganizationCard organization={org} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default OrganizationsPage;
