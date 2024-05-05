import { openModal, closeModal } from "./modal";
import { deleteCardOnServer } from "../api.js";

const cardTemplate = document.querySelector('#card-template').content;
const popupTypeConfirm = document.querySelector('.popup_type_confirm');
const buttonConfirmDeletion = document.querySelector('.popup__button[name=confirm]');

function createCard(name, source, numberOfLikes, id, likeCard, onImageClick, deleteCard) {
    const cardClone = cardTemplate.querySelector('.card').cloneNode(true);

    const cardLikeButton = cardClone.querySelector('.card__like-button');
    const cardButtonDelete = cardClone.querySelector('.card__delete-button');
    const cardImg = cardClone.querySelector('.card__image');
    const cardTitle = cardClone.querySelector('.card__title');
    const cardLikeQuantity = cardClone.querySelector('.card__like-button-quantity');

    cardTitle.textContent = name;
    cardImg.src = source;
    cardImg.alt = name;
    cardLikeQuantity.textContent = numberOfLikes;
    cardClone.id = id;

    if (!deleteCard) {
        cardButtonDelete.style.display = 'none';
    } else {
        cardButtonDelete.addEventListener('click', (evt) => { 
            buttonConfirmDeletion.dataset.cardId = evt.target.nextSibling.parentElement.id;
            openModal(popupTypeConfirm); 
        });
    }

    cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton));
    cardImg.addEventListener('click', () => onImageClick(name, source));
    
    return cardClone;
};

buttonConfirmDeletion.addEventListener('click', (evt) => deleteCard(evt.target.dataset.cardId)); 

function likeCard(button) {
    button.classList.toggle('card__like-button_is-active');
};

function deleteCard(id) {
    const card = document.getElementById(id);

    card.remove();
    closeModal(popupTypeConfirm, card);
    deleteCardOnServer(id);
};

export { createCard, likeCard, deleteCard }



