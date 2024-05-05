import { clearValidation } from "./validation";

function openModal(popup) {
    popup.classList.add('popup_is-opened');
    window.addEventListener('keyup', handleCloseModalByEsc);
    clearValidation(popup, {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    })
};

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    window.removeEventListener('keyup', handleCloseModalByEsc);
};

function handleCloseModalByEsc(evt) {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
};

function setCloseModalByClickListeners(popups) {
    popups.forEach(popup => {
        const closeButton = popup.querySelector('.popup__close');

        closeButton.addEventListener('click', () => closeModal(popup));
        popup.addEventListener('click', function(evt) {
            if (evt.target.classList.contains("popup")) {
                closeModal(popup);
            }
        });
    })
};

export { openModal, closeModal, setCloseModalByClickListeners }