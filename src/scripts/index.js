import '../styles/index.css';
import { createCard, handleLikeCard, deleteCard } from './components/card';
import { openModal, closeModal, setCloseModalByClickListeners } from './components/modal';
import { enableValidation } from './components/validation';
import { getUser, getCards, updateProfile, postNewCard, patchProfileAvatar } from './api.js'

const listOfCards = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');
const popupTypeEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupTypeEditProfile = document.querySelector('.popup_type_edit');
const popupTypeAddCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupDescription = document.querySelector('.popup__caption');
const popupImg = document.querySelector('.popup__image');

const popupButtonSaveAvatar = document.querySelector('.popup__button[name=save-avatar]');
const buttonEditAvatar = document.querySelector('.profile__avatar-button');
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

    patchProfileAvatar(linkAvatarInput.value)
    .then(() => {
        profileImage.style.backgroundImage = `url(${linkAvatarInput.value})`;
        closeModal(popupTypeEditAvatar);
        popupButtonSaveAvatar.textContent = 'Сохранить';
        linkAvatarInput.value = '';
    })
}

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameProfileInput.value;
    profileJob.textContent = jobProfileInput.value;
    closeModal(popupTypeEditProfile);
    updateProfile(nameProfileInput.value, jobProfileInput.value)
};

function handleAddFormSubmit(evt) {
    console.log(evt)
    evt.preventDefault();
    postNewCard(nameAddInput.value, linkAddInput.value)
        .then((cardData) => {
            const card = createCard(cardData, handleLikeCard, openCardImageModal, deleteCard);
            listOfCards.prepend(card); 
        })
    closeModal(popupTypeAddCard);
    formAddElement.reset();
};

buttonEditAvatar.addEventListener('click', () => openModal(popupTypeEditAvatar));
buttonEditProfile.addEventListener('click', () => { openModal(popupTypeEditProfile); updateEditPopup() });
buttonAddCard.addEventListener('click', () => openModal(popupTypeAddCard));

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
                card = createCard(cardData, handleLikeCard, openCardImageModal, deleteCard);
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

