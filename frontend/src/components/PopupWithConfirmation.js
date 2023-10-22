import PopupWithForm from "./PopupWithForm";

export default function PopupWithConfirmation({ isOpen, onClose }) {
  return (
    <PopupWithForm
      name="popup_deleteCard"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Да"></PopupWithForm>
  );
}
