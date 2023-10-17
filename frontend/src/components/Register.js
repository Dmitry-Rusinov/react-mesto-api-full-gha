import { Link } from "react-router-dom";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

export default function Register({ onRegister }) {
  const { errors, values, handleChange } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
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
          Зарегистрироваться
        </button>
      </form>
      <p className="auth__toLogin">
        Уже зарегистрированы?{" "}
        <Link className="auth__button-login" to={"/signin"}>
          Войти
        </Link>
      </p>
    </div>
  );
}
