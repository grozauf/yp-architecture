class Api {
  constructor({ address, token, groupId }) {
    // стандартная реализация -- объект options
    this._token = token;
    this._groupId = groupId;
    this._address = address;

    // Запросы в примере работы выполняются к старому Api, в новом URL изменены.
  }

  getAppInfo() {
    return Promise.all([this.getCardList(), this.getUserInfo()]);
  }

  getCardList() {
    return fetch(`${this._address}/cards`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: this._token,
      },
    }, {mode:'no-cors'})
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

  addCard({ name, link }) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }, {mode:'no-cors'})
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

  removeCard(cardID) {
    return fetch(`${this._address}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: this._token,
      },
    }, {mode:'no-cors'})
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: this._token,
      },
    }, {mode:'no-cors'})
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }, {mode:'no-cors'})
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar,
      }),
    }, {mode:'no-cors'})
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

  changeLikeCardStatus(cardID, like) {
    // Обычная реализация: 2 разных метода для удаления и постановки лайка.
    return fetch(`${this._address}/cards/${cardID}/likes`, {
      method: like ? 'PUT' : 'DELETE',
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: this._token,
        'Content-Type': 'application/json',
      },
    }, {mode:'no-cors'})
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }
}

const api = new Api({
  address: '',
  groupId: `cohort0`,
  token: `80a75492-21c5-4330-a02f-308029e94b63`,
});

export default api;
