import React, { useEffect } from "react";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirmation from "./PopupWithConfirmation";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as Auth from "./Auth";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpened] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpened] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpened] = React.useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpened] =
    React.useState(false);
  const [isInfoToolTipOpen, setInfoToolTipOpened] = React.useState(false);
  const [isRegistrationConfirm, setRegistrationConfirm] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const navigate = useNavigate();

  //получение промисов
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  //открываем попап увеличенного изображения
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  //открываем попап с аватаром
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpened(true);
  };

  //открываем попап профиля
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpened(true);
  };

  //открываем попап добавления новой карточки
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpened(true);
  };

  /* открываем попап подтверждения удаления карточки
  const handleButtonDeleteCardClick = () => {
    setConfirmationPopupOpened(true);
  };*/

  //открываем попап с информацией о регистрации
  const handleInfoToolTipClick = () => {
    setInfoToolTipOpened(true);
  };

  //удаляем карточку
  const handleCardDelete = (cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((cards) => {
          return cards.filter((card) => card._id !== cardId);
        });
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  //ставим лайк карточке
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  //закрываем попап
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpened(false);
    setIsEditProfilePopupOpened(false);
    setIsAddPlacePopupOpened(false);
    setConfirmationPopupOpened(false);
    setSelectedCard({});
    setInfoToolTipOpened(false);
  };

  //обновляем данные пользователя
  const handleUpdateUser = (userData) => {
    api
      .setUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  //обновляем аватар
  const handleUpdateAvatar = (userAvatar) => {
    api
      .setUserAvatar(userAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  //добавляем карточку
  const handleAddPlaceSubmit = (card) => {
    api
      .setUserCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  //проверяем есть ли токен у пользователя при загрузке страницы
  useEffect(() => {
    tokenCheck();
  }, []);

  //проверяем наличие токена
  const tokenCheck = () => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      if (token) {
        Auth.getContent(token)
          .then((res) => {
            if (res) {
              setUserEmail(res.data.email);
              setLoggedIn(true);
              navigate("/", { replace: true });
            }
          })
          .catch((err) => console.log(`Ошибка: ${err}`));
      }
    }
  };

  //проверяем успешна регистрация или нет
  const checkRegistration = ({ email, password }) => {
    Auth.register({ email, password })
      .then((data) => {
        if (data) {
          setRegistrationConfirm(true);
          handleInfoToolTipClick();
          navigate("/signin");
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setRegistrationConfirm(false);
        handleInfoToolTipClick();
      });
  };

  //выходим из системы
  const onSignOut = () => {
    localStorage.removeItem("token");
    setUserEmail("");
    navigate("/signin");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="content">
          <Header userEmail={userEmail} onSignOut={onSignOut} />
          <Routes>
            <Route
              path="*"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            />
            <Route
              path="/signup"
              element={<Register onRegister={checkRegistration} />}
            />
            <Route
              path="/signin"
              element={
                <Login handleLogin={handleLogin} setUserEmail={setUserEmail} />
              }
            />
            <Route
              path="/"
              element={
                (<>
                <ProtectedRoute
                  component={Main}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardDelete={handleCardDelete}
                  onCardLike={handleCardLike}
                  cards={cards}
                  loggedIn={loggedIn}
                />
                <Footer />
                </>
                )
              }         
            />
            
          </Routes>
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithConfirmation
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          isConfirmReg={isRegistrationConfirm}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
