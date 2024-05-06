const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-13',
    authoriseHeader: {
        authorization: 'f465fb02-51a8-4242-b3a2-1fc5d06a9ddb',
    },
    headers: {
        authorization: 'f465fb02-51a8-4242-b3a2-1fc5d06a9ddb',
        'Content-Type': 'application/json'
    },
}

function checkResponse(response) {
    if(!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
    }
    return response.json();
}

function getUser() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.authoriseHeader,
    })
    .then(res => {
        return checkResponse(res);
    })
}

function getCards (){
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.authoriseHeader,
    })
    .then(res => {
        return checkResponse(res);
    })
}

function updateProfile(newName, newDescription) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newName,
            about: newDescription,
        }),
    })
    .then(res => {
        return checkResponse(res);
    })
}

function postNewCard(nameValue, linkvValue) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: nameValue,
            link: linkvValue,
        })
    })
    .then(res => {
        return checkResponse(res);
    })
}

function reqDeleteCard(id) {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.authoriseHeader,
    })
    .then(res => {
        return checkResponse(res);
    })
}

function reqLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.authoriseHeader,
    })
    .then(res => {
        return checkResponse(res);
    })
};

function reqDeleteLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.authoriseHeader,
    })
    .then(res => {
        return checkResponse(res);
    })
}

function patchProfileAvatar() {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.authoriseHeader,
    })
    .then(res => {
        return checkResponse(res);
    })
}

export { getUser, getCards, updateProfile, postNewCard, reqDeleteCard, reqLike, reqDeleteLike, patchProfileAvatar }