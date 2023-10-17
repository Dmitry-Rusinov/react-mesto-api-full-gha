import headerLogo from "../images/logo.svg";
import { Link, Route, Routes } from "react-router-dom";

export default function Header({ userEmail, onSignOut }) {
  return (
    <header className="header">
      <img alt="Логотип" src={headerLogo} className="header__logo" />

      <Routes>
        <Route
          path="/signin"
          element={
            <Link to="/signup" className="header__button-auth">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/signup"
          element={
            <Link to="/signin" className="header__button-auth">
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <div className="header__auth-container">
              <span className="header__user-email">{userEmail}</span>
              <Link
                style={{ color: "#A9A9A9" }}
                onClick={onSignOut}
                to="/signin"
                className="header__button-auth">
                Выйти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}
