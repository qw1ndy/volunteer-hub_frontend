import React, { useState } from "react";
import styles from "../styles/AuthForm.module.css";
import { authService } from "../services/api";
import { RegisterData, AuthCredentials } from "../types/api";

interface AuthFormProps {
  onClose: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<RegisterData>({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        const { email, password } = formData;
        await authService.login({ email, password });
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError("Паролі не співпадають");
          return;
        }
        await authService.register(formData);
      }
      onClose();
      window.location.reload();
    } catch (err: any) {
      setError(err.response?.data?.error || "Сталася помилка");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authModal}>
      <div className={styles.authContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2>{isLogin ? "Вхід" : "Реєстрація"}</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className={styles.authForm}>
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
                disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>

          {!isLogin && (
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Підтвердіть пароль</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading
              ? "Завантаження..."
              : isLogin
              ? "Увійти"
              : "Зареєструватися"}
          </button>
        </form>

        <div className={styles.switchForm}>
          <p>
            {isLogin ? "Немає акаунту?" : "Вже є акаунт?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className={styles.switchButton}
              disabled={isLoading}
            >
              {isLogin ? "Зареєструватися" : "Увійти"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
