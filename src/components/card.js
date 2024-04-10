import { openCardImageModal } from './modal'

function createCard(name, source, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardClone = cardTemplate.querySelector('.card').cloneNode(true);

    const cardLikeButton = cardClone.querySelector('.card__like-button');
    const cardButtonDelete = cardClone.querySelector('.card__delete-button');
    const cardImg = cardClone.querySelector('.card__image');
    const cardTitle = cardClone.querySelector('.card__title');

    cardTitle.textContent = name;
    cardImg.setAttribute('src', source);

    cardImg.addEventListener('click', () => openCardImageModal(name, source));
    cardLikeButton.addEventListener('click', likeCard);
    cardButtonDelete.addEventListener('click', deleteCard(cardClone));
    
    return cardClone;
}

function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

function deleteCard(card) {
    return () => card.remove();
}

export { createCard, deleteCard }



