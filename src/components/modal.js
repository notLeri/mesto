function openModal(popup) {
    popup.classList.toggle('popup_is-opened');
    window.addEventListener('keyup', makePopupEscapable);
}

function closeModal(popup) {
    popup.classList.toggle('popup_is-opened');
    window.removeEventListener('keyup', makePopupEscapable);
}

function openCardImageModal(name, source) {
    const popupTypeImage = document.querySelector('.popup_type_image');
    const popupImg = document.querySelector('.popup__image');
    const popupDescription = document.querySelector('.popup__caption');

    popupImg.setAttribute('src', source);
    popupDescription.textContent = name;
    popupTypeImage.classList.toggle('popup_is-opened');
    window.addEventListener('keyup', makePopupEscapable);
}

function makePopupEscapable(evt) {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'))
    }
}

export { openModal, closeModal, openCardImageModal }