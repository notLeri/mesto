import { openModal, closeModal } from "./modal";
import { reqDeleteCard, reqLike, reqDeleteLike } from "../api.js";

const cardTemplate = document.querySelector('#card-template').content;
const popupTypeConfirm = document.querySelector('.popup_type_confirm');
const buttonConfirmDeletion = document.querySelector('.popup__button[name=confirm]');

function createCard(name, source, numberOfLikes, id, handlelikeCard, onImageClick, deleteCard) {
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

    cardLikeButton.addEventListener('click', () => handlelikeCard(cardLikeButton, id));
    cardImg.addEventListener('click', () => onImageClick(name, source));
    
    return cardClone;
};

buttonConfirmDeletion.addEventListener('click', (evt) => deleteCard(evt.target.dataset.cardId)); 

function handlelikeCard(button, cardId) {
    if (button.classList.contains('card__like-button_is-active')) {
        reqDeleteLike(cardId);
    } else {
        reqLike(cardId);
    }
    button.classList.toggle('card__like-button_is-active');
};

function deleteCard(id) {
    const card = document.getElementById(id);

    card.remove();
    closeModal(popupTypeConfirm, card);
    reqDeleteCard(id);
};

export { createCard, handlelikeCard, deleteCard }



