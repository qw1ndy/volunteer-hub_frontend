import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/AuthForm.module.css";

interface AuthFormProps {
  onClose: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError("Паролі не співпадають");
          return;
        }
        await register(formData.email, formData.password);
      }
      onClose();
      navigate("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Сталася помилка");
    }
  };

  return (
    <div className={styles.authForm}>
      <div className={styles.formContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2>{isLogin ? "Вхід" : "Реєстрація"}</h2>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.formGroup}>
              <label htmlFor="name">Ім'я</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {!isLogin && (
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Підтвердження паролю</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <button type="submit" className={styles.submitButton}>
            {isLogin ? "Увійти" : "Зареєструватися"}
          </button>
        </form>
        {isLogin && (
          <div className={styles.testLogin}>
            <button
              type="button"
              onClick={async () => {
                try {
                  await login("test@example.com", "test123");
                  onClose();
                  navigate("/profile");
                } catch (err) {
                  setError(
                    err instanceof Error ? err.message : "Сталася помилка"
                  );
                }
              }}
              className={styles.testLoginButton}
            >
              Тестовий вхід
            </button>
            <p className={styles.testLoginInfo}>
              Email: test@example.com
              <br />
              Пароль: test123
            </p>
          </div>
        )}
        <div className={styles.switchForm}>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className={styles.switchButton}
          >
            {isLogin
              ? "Немає акаунту? Зареєструватися"
              : "Вже є акаунт? Увійти"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
