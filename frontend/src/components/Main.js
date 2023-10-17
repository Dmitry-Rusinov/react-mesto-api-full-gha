import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardDelete,
  onCardLike,
  cards
}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <button
          type="button"
          onClick={onEditAvatar}
          className="profile__edit-avatar"
          title="Кнопка редактирования аватара"></button>

        <img
          src={currentUser.avatar}
          alt="Фотография пользователя"
          className="profile__avatar"
        />
        <div className="profile__info">
          <h1 className="profile__info-title">{currentUser.name}</h1>
          <button
            type="button"
            onClick={onEditProfile}
            title="Кнопка редактирования профиля"
            className="profile__edit-button"></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          type="button"
          onClick={onAddPlace}
          title="Кнопка добавления фото-карточки"
          className="profile__add-button"></button>
      </section>
      <section className="elements">
        <ul className="elements__card">
          {cards.map((data) => {
            return (
              <li key={data._id}>
                <Card 
                card={data} 
                onCardClick={onCardClick}
                onCardDelete={onCardDelete}
                onCardLike={onCardLike}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}