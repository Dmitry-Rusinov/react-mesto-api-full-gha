import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const { errors, resetForm, values, handleChange } = useFormAndValidation();

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      name="popup_editProfile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить">
      <fieldset className="popup__content">
        <input
          className="popup__input popup__input_user_name"
          type="text"
          id="user-name"
          placeholder="Как вас зовут?"
          minLength="2"
          maxLength="40"
          name="name"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
        <span className="popup__input-error user-name-error">
          {errors.name}
        </span>
        <input
          className="popup__input popup__input_user_job"
          type="text"
          id="description"
          placeholder="Дополнительная информация"
          minLength="2"
          maxLength="200"
          name="about"
          onChange={handleChange}
          value={values.about || ""}
          required
        />
        <span className="popup__input-error description-error">
          {errors.about}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}
