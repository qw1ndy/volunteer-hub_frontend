import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/Navbar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthForm from "./AuthForm";

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  const handleCloseAuthForm = () => {
    setShowAuthForm(false);
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-light bg-light ${styles.navbar}`}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            VolonteerHub
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/organizations">
                  Організації
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/events">
                  Події
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              {isAuthenticated ? (
                <div className={`dropdown ${styles.dropdown}`}>
                  <button
                    className={`btn dropdown-toggle ${styles.profileButton}`}
                    type="button"
                    id="profileDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <i className="bi bi-person-circle me-2"></i>
                    {user?.name}
                  </button>
                  <ul
                    className={`dropdown-menu dropdown-menu-end ${
                      styles.dropdownMenu
                    } ${showDropdown ? "show" : ""}`}
                    aria-labelledby="profileDropdown"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/profile"
                        onClick={() => setShowDropdown(false)}
                      >
                        <i className="bi bi-person me-2"></i>
                        Профіль
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/settings"
                        onClick={() => setShowDropdown(false)}
                      >
                        <i className="bi bi-gear me-2"></i>
                        Налаштування
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Вийти
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <button
                  className={`btn btn-outline-primary ${styles.loginButton}`}
                  onClick={() => setShowAuthForm(true)}
                >
                  Увійти
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      {showAuthForm && <AuthForm onClose={handleCloseAuthForm} />}
    </>
  );
};

export default Navbar;
