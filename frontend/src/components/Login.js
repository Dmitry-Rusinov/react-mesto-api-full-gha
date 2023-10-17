import { useEffect } from "react";
import * as Auth from "./Auth";
import { useNavigate } from "react-router-dom";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

export default function Login({ handleLogin, setUserEmail }) {
  const { errors, values, handleChange } = useFormAndValidation();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    Auth.authorize(values.email, values.password)
      .then((data) => {
        if (data) {
          handleLogin();
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (handleSubmit) {
      setUserEmail(values.email);
    }
  });

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        className="auth__form">
        <input
          className="auth__input"
          type="email"
          id="user-email"
          placeholder="Email"
          minLength="2"
          maxLength="40"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        <span className="auth__input-error user-email-error">
          {errors.email}
        </span>
        <input
          className="auth__input"
          type="text"
          id="user-password"
          placeholder="Пароль"
          minLength="4"
          maxLength="12"
          name="password"
          onChange={handleChange}
          value={values.password || ""}
          required
        />
        <span className="auth__input-error password-error">
          {errors.password}
        </span>
        <button type="submit" className="auth__submit">
          Войти
        </button>
      </form>
    </div>
  );
}
