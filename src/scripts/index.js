import '../styles/index.css';
import { createCard, handleLikeCard } from './components/card';
import { openModal, closeModal, setCloseModalByClickListeners } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { getUser, getCards, updateProfile, postNewCard, patchAvatar, reqDeleteCard } from './api.js'

const listOfCards = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');
const popupTypeEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupTypeConfirm = document.querySelector('.popup_type_confirm');
const popupTypeEditProfile = document.querySelector('.popup_type_edit');
const popupTypeAddCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupDescription = document.querySelector('.popup__caption');
const popupImg = document.querySelector('.popup__image');

const popupButtonSaveAvatar = document.querySelector('.popup__button[name=save-avatar]');
const popupButtonSaveProfile = document.querySelector('.popup__button[name=save-profile]');
const popupButtonSaveCard = document.querySelector('.popup__button[name=save-card]');

const buttonEditAvatar = document.querySelector('.profile__avatar-button');
const buttonConfirmDeletion = document.querySelector('.popup__button[name=confirm]');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

const profileJob = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__avatar');
const profileName = document.querySelector('.profile__title');

const formEditElement = document.querySelector('.popup__form[name=edit-profile]');
const nameProfileInput = document.querySelector('.popup__input[name=name]');
const jobProfileInput = document.querySelector('.popup__input[name=description]');

const formAddElement = document.querySelector('.popup__form[name=new-place]');
const nameAddInput = document.querySelector('.popup__input[name=place-name]');
const linkAddInput = document.querySelector('.popup__input[name=addLink]');

const formEditAvatar = document.querySelector('.popup__form[name=new-avatar]');
const linkAvatarInput = document.querySelector('.popup__input[name=avatar-link]');

let currentCardIdToDelete;

const popupConfigOfClasses = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

setCloseModalByClickListeners(popups);

function openCardImageModal(name, source) {
    popupImg.src = source;
    popupImg.alt = name;
    popupDescription.textContent = name;
    openModal(popupTypeImage);
};

function updateEditPopup() {
    nameProfileInput.value = profileName.textContent;
    jobProfileInput.value = profileJob.textContent;
};

function handleEditAvatarFormSubmit(evt) {
    evt.preventDefault();
    popupButtonSaveAvatar.textContent = 'Сохранение...'

    patchAvatar(linkAvatarInput.value)
        .then(() => {
            profileImage.style.backgroundImage = `url(${linkAvatarInput.value})`;
            closeModal(popupTypeEditAvatar);
            linkAvatarInput.value = '';
            popupButtonSaveAvatar.classList.add(popupConfigOfClasses.inactiveButtonClass);
            popupButtonSaveAvatar.setAttribute('disabled', '');
        })
        .catch((err) => {
            console.log(`Ошибка выполнения запроса к серверу - ${err}`);
        })
        .finally(() => {
            setTimeout(() => {
                popupButtonSaveAvatar.textContent = 'Сохранить';
            }, 1000);
        })
}

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    popupButtonSaveProfile.textContent = 'Сохранение...'

    updateProfile(nameProfileInput.value, jobProfileInput.value)
        .then(() => {
            profileName.textContent = nameProfileInput.value;
            profileJob.textContent = jobProfileInput.value;
            closeModal(popupTypeEditProfile);
            popupButtonSaveProfile.classList.add(popupConfigOfClasses.inactiveButtonClass);
            popupButtonSaveProfile.setAttribute('disabled', '');
        })
        .catch((err) => {
            console.log(`Ошибка выполнения запроса к серверу - ${err}`);
        })
        .finally(() => {
            setTimeout(() => {
                popupButtonSaveProfile.textContent = 'Сохранить';
            }, 1000);
        })
};

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    popupButtonSaveCard.textContent = 'Сохранение...'

    postNewCard(nameAddInput.value, linkAddInput.value)
        .then((cardData) => {
            const card = createCard(cardData, handleLikeCard, openCardImageModal, handleCardDeleteButton);
            listOfCards.prepend(card); 
            closeModal(popupTypeAddCard);
            formAddElement.reset();
            popupButtonSaveCard.classList.add(popupConfigOfClasses.inactiveButtonClass);
            popupButtonSaveCard.setAttribute('disabled', '');
        })
        .catch((err) => {
            console.log(`Ошибка выполнения запроса к серверу - ${err}`);
        })
        .finally(() => {
            setTimeout(() => {
                popupButtonSaveCard.textContent = 'Сохранить';
            }, 1000);
        })
};

function handleCardDeleteButton(id) {
    openModal(popupTypeConfirm);
    currentCardIdToDelete = id;
}

function deleteCard(id) {
    const card = document.getElementById(id);

    reqDeleteCard(id)
        .then(() => {
            card.remove();
            closeModal(popupTypeConfirm, card);
        })
        .catch((err) => {
            console.log(`Ошибка выполнения запроса к серверу - ${err}`);
        })
};

buttonEditAvatar.addEventListener('click', () => { 
    openModal(popupTypeEditAvatar); 
    clearValidation(popupTypeEditAvatar, popupConfigOfClasses);
});
buttonEditProfile.addEventListener('click', () => { 
    openModal(popupTypeEditProfile); 
    updateEditPopup(); 
    clearValidation(popupTypeEditProfile, popupConfigOfClasses) 
});
buttonAddCard.addEventListener('click', () => { 
    openModal(popupTypeAddCard); 
    clearValidation(popupTypeAddCard, popupConfigOfClasses) 
});

buttonConfirmDeletion.addEventListener('click', () => deleteCard(currentCardIdToDelete))

formEditAvatar.addEventListener('submit', handleEditAvatarFormSubmit);
formEditElement.addEventListener('submit', handleEditProfileFormSubmit);
formAddElement.addEventListener('submit', handleAddFormSubmit); 


enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
})

Promise.all([getUser(), getCards()])
    .then(results => {
        const profileData = results[0];
        const cardsData = results[1];

        profileName.textContent = profileData.name;
        profileJob.textContent = profileData.about;
        profileImage.style.backgroundImage = `url(${profileData.avatar})`;

        cardsData.forEach(cardData => {
            let card;
            if (cardData.owner._id === profileData._id) {
                card = createCard(cardData, handleLikeCard, openCardImageModal, handleCardDeleteButton);
            } else {
                card = createCard(cardData, handleLikeCard, openCardImageModal);
            }

            if (cardData.likes.some((person) => {
                return person._id === profileData._id;
            })) {
                card.querySelector('.card__like-button').classList.toggle('card__like-button_is-active')
            } 
            listOfCards.append(card);
        })
    })

