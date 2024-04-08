import initialCards from './scripts/cards';
import './styles/index.css';

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const listOfCards = document.querySelector('.places__list');
const addCardButton = document.querySelector('.profile__add-button');

// @todo: Функция создания карточкиx

function createCard(name, source, deleteCard) {
    const cardClone = cardTemplate.querySelector('.card').cloneNode(true);

    const cardButtonDelete = cardClone.querySelector('.card__delete-button');
    const cardImgSrc = cardClone.querySelector('.card__image');
    const cardTitle = cardClone.querySelector('.card__title');

    cardTitle.textContent = name;
    cardImgSrc.setAttribute('src', source);

    cardButtonDelete.addEventListener('click', deleteCard(cardClone));
    
    console.log(cardClone);
    return cardClone;
}   

// @todo: Функция удаления карточки

function deleteCard(card) {
    return () => card.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (card) {
    const modifiedCard = createCard(card.name, card.link, deleteCard);
    listOfCards.append(modifiedCard); 
});


