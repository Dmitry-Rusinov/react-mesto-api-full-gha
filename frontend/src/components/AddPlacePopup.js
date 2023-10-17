import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

export default function AddPlacePopup({ isOpen, onClose, onAddCard }) {
  const { errors, resetForm, values, handleChange } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard({
      name: values.newPlace,
      link: values.pictureLink,
    });
  }

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  return (
    <PopupWithForm
      name="popup_addCard"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
      errors={errors}>
      <fieldset className="popup__content">
        <input
          className="popup__input"
          id="card-description"
          type="text"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          name="newPlace"
          required
          value={values.newPlace || ""}
          onChange={handleChange}
        />
        <span className="popup__input-error card-description-error">
          {errors.newPlace}
        </span>
        <input
          className="popup__input"
          id="picture-link"
          type="url"
          placeholder="Ссылка на картинку"
          minLength="1"
          maxLength="400"
          name="pictureLink"
          required
          value={values.pictureLink || ""}
          onChange={handleChange}
        />
        <span className="popup__input-error picture-link-error">
          {errors.pictureLink}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}
