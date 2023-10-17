import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const { errors, resetForm, values, handleChange } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: values.avatarLink,
    });
  }

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  return (
    <PopupWithForm
      name="popup_edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить">
      <fieldset className="popup__content">
        <input
          className="popup__input"
          id="avatar-link"
          type="url"
          placeholder="Ссылка на аватар пользователя"
          minLength="1"
          maxLength="400"
          name="avatarLink"
          onChange={handleChange}
          value={values.avatarLink || ""}
          required
        />
        <span className="popup__input-error avatar-link-error">
          {errors.avatarLink}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}
