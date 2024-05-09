import { reqLike, reqDeleteLike } from "../api.js";

const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, handlelikeCard, onImageClick, onDeleteClick) {
    const cardClone = cardTemplate.querySelector('.card').cloneNode(true);

    const cardButtonDelete = cardClone.querySelector('.card__delete-button');
    const cardLikeButton = cardClone.querySelector('.card__like-button');
    const cardImg = cardClone.querySelector('.card__image');
    const cardTitle = cardClone.querySelector('.card__title');
    const cardLikeQuantity = cardClone.querySelector('.card__like-button-quantity');

    cardTitle.textContent = cardData.name;
    cardImg.src = cardData.link;
    cardImg.alt = cardData.name;
    cardLikeQuantity.textContent = cardData.likes.length;
    cardClone.id = cardData._id;

    if (!onDeleteClick) {
        cardButtonDelete.style.display = 'none';
    } else {
        cardButtonDelete.addEventListener('click', () => { onDeleteClick(cardData._id); });
    }

    cardLikeButton.addEventListener('click', () => handlelikeCard(cardLikeButton, cardData._id, cardLikeQuantity));
    cardImg.addEventListener('click', () => onImageClick(cardData.name, cardData.link));
    
    return cardClone;
};

function handleLikeCard(button, id, numberOfLikes) {
    if (button.classList.contains('card__like-button_is-active')) {
        reqDeleteLike(id)
            .then((res) => {
                numberOfLikes.textContent = res.likes.length;
                button.classList.remove('card__like-button_is-active');
            })
            .catch((err) => {
            console.log(`Ошибка выполнения запроса к серверу - ${err}`);
        })
    } else {
        reqLike(id)
            .then((res) => {
                numberOfLikes.textContent = res.likes.length;
                button.classList.add('card__like-button_is-active');
            })
            .catch((err) => {
                console.log(`Ошибка выполнения запроса к серверу - ${err}`);
            })
    }
};

export { createCard, handleLikeCard }



