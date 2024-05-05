import '../styles/index.css';
import { createCard, handlelikeCard, deleteCard } from './components/card';
import { openModal, closeModal, setCloseModalByClickListeners } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { getUser, getCards, updateProfile, postNewCard, reqDeleteCard, reqLike, reqDeleteLike } from './api.js'

const listOfCards = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAddCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImg = document.querySelector('.popup__image');
const popupDescription = document.querySelector('.popup__caption');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

const profileImage = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const formEditElement = document.querySelector('.popup__form[name=edit-profile]');
const nameProfileInput = document.querySelector('.popup__input[name=name]');
const jobProfileInput = document.querySelector('.popup__input[name=description]');

const formAddElement = document.querySelector('.popup__form[name=new-place]');
const nameAddInput = document.querySelector('.popup__input[name=place-name]');
const linkAddInput = document.querySelector('.popup__input[name=link]');

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

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameProfileInput.value;
    profileJob.textContent = jobProfileInput.value;
    closeModal(popupTypeEdit);
    updateProfile(nameProfileInput.value, jobProfileInput.value)
};
function handleAddFormSubmit(evt) {
    const card = createCard(nameAddInput.value, linkAddInput.value, 0, cardData._id, handlelikeCard, openCardImageModal, deleteCard);
    evt.preventDefault();
    listOfCards.prepend(card); 
    closeModal(popupTypeAddCard);
    formAddElement.reset();
    postNewCard(nameAddInput.value, linkAddInput.value)
};

buttonAddCard.addEventListener('click', () => openModal(popupTypeAddCard));
buttonEditProfile.addEventListener('click', () => { openModal(popupTypeEdit); updateEditPopup() });

formAddElement.addEventListener('submit', handleAddFormSubmit); 
formEditElement.addEventListener('submit', handleEditFormSubmit);

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
        profileImage.src = profileData.avatar;

        cardsData.forEach(cardData => {
            let card;
            if (cardData.owner._id === profileData._id) {
                card = createCard(cardData.name, cardData.link, cardData.likes.length, cardData._id, handlelikeCard, openCardImageModal, deleteCard);
            } else {
                card = createCard(cardData.name, cardData.link, cardData.likes.length, cardData._id, handlelikeCard, openCardImageModal);
            }
            listOfCards.append(card);
        })
    })

// updateProfile(newName, newDescription)
//     .then(res => res.json())
//     .then((result) => {
//         profileImage.src = result.avatar;
//         profileName.textContent = result.name;
//         profileJob.textContent = result.about;
//     });


// postNewCard(newName, newLink)
//     .then(res => res.json())
//     .then((result) => {
//         return console.log(result)
//     });
