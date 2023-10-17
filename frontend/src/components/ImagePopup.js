export default function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_overlay popup_image ${
        card.name ? "popup_opened" : ""
      }`}
      id="popupImage">
      <div className="popup__image-container">
        <button
          type="button"
          className="popup__closed"
          title="Кнопка закрытия попапа"
          onClick={onClose}></button>
        <img className="popup__picture" alt={card.name} src={card.link} />
        <h2 className="popup__image-title">{card.name}</h2>
      </div>
    </div>
  );
}