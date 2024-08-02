const BASE_URL = '';

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  }, {mode:'no-cors'})
  .then(getResponse)
};
export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(getResponse)
  .then((data) => {
    localStorage.setItem('jwt', data.token)
    return data;
  }, {mode:'no-cors'})
};
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }, {mode:'no-cors'})
  .then(getResponse)
}