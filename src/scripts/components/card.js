const cardTemplate = document.querySelector('#card-template').content;

function createCard(name, source, likeCard, deleteCard, onImageClick) {
    const cardClone = cardTemplate.querySelector('.card').cloneNode(true);

    const cardLikeButton = cardClone.querySelector('.card__like-button');
    const cardButtonDelete = cardClone.querySelector('.card__delete-button');
    const cardImg = cardClone.querySelector('.card__image');
    const cardTitle = cardClone.querySelector('.card__title');

    cardTitle.textContent = name;
    cardImg.src = source;
    cardImg.alt = name;

    cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton));
    cardButtonDelete.addEventListener('click', () => deleteCard(cardClone));
    cardImg.addEventListener('click', () => onImageClick(name, source));
    
    return cardClone;
};

function likeCard(button) {
    button.classList.toggle('card__like-button_is-active');
};

function deleteCard(card) {
    card.remove();
};

export { createCard, likeCard, deleteCard }



