const URL_API = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export const getIngredients = () => {
    return fetch(`${URL_API}/ingredients`)
        .then(res => checkResponse(res))
        .then(data => {
            if (data?.success) return data.data;
            return Promise.reject(data);
        });
}