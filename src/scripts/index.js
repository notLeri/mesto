import '../styles/index.css';
import initialCards from './cards';
import { createCard, likeCard, deleteCard } from './components/card';
import { openModal, closeModal, setCloseModalByClickListeners } from './components/modal';

const listOfCards = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAddCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImg = document.querySelector('.popup__image');
const popupDescription = document.querySelector('.popup__caption');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const formEditElement = document.querySelector('.popup__form[name=edit-profile]');
const nameProfileInput = document.querySelector('.popup__input[name=name]');
const jobProfileInput = document.querySelector('.popup__input[name=description]');

const formAddElement = document.querySelector('.popup__form[name=new-place]');
const nameAddInput = document.querySelector('.popup__input[name=place-name]');
const linkAddInput = document.querySelector('.popup__input[name=link]');

initialCards.forEach(function (card) {
    const modifiedCard = createCard(card.name, card.link, likeCard, deleteCard, openCardImageModal);
    listOfCards.append(modifiedCard); 
});

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
};
function handleAddFormSubmit(evt) {
    evt.preventDefault();
    const card = createCard(nameAddInput.value, linkAddInput.value, likeCard, deleteCard, openCardImageModal);
    listOfCards.prepend(card); 
    closeModal(popupTypeAddCard);
    formAddElement.reset();
};

buttonAddCard.addEventListener('click', () => openModal(popupTypeAddCard));
buttonEditProfile.addEventListener('click', () => { openModal(popupTypeEdit); updateEditPopup() });

formAddElement.addEventListener('submit', handleAddFormSubmit); 
formEditElement.addEventListener('submit', handleEditFormSubmit); 
