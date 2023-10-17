import signV from "../images/signV.svg";
import signX from "../images/signX.svg"

export default function InfoTooltip({ isOpen, onClose, isConfirmReg }) {
  return (
    <div
      className={`popup popup_type_infoToolTip ${
        isOpen ? "popup_opened" : ""
      }`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__closed"
          onClick={onClose}></button>
        <img alt="Знак подтверждения регистрации " className="popup__image-tip" src={isConfirmReg ? signV : signX}></img>
        <p className="popup__confirm-auth">{isConfirmReg ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
      </div>
    </div>
  );
}
 
