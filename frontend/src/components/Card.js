import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__button-like ${
    isLiked && "elements__button-like_active"
  }`;

  const handleClick = () => {
    onCardClick(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card._id);
  };

  const handleCardLike = () => {
    onCardLike(card);
  };

  return (
    <div className="elements__card-content">
      <img
        src={card.link}
        alt={card.name}
        onClick={handleClick}
        className="elements__picture"
      />
      {isOwn && (
        <button
          type="button"
          title="Кнопка удаления карточки"
          className="elements__button-delete"
          onClick={handleDeleteClick}></button>
      )}
      <div className="elements__description">
        <div className="elements__container">
          <h2 className="elements__title">{card.name}</h2>
          <div className="elements__like-container">
            <button
              type="button"
              title="Кнопка лайка картинки"
              className={cardLikeButtonClassName}
              onClick={handleCardLike}></button>
            <span className="elements__likes-counter">{card.likes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
