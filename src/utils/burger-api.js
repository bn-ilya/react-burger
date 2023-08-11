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

export const createOrder = (ingredientsIds) => {
    return fetch(`${URL_API}/orders`, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ingredients: ingredientsIds
        })
    })
        .then(checkResponse)
        .then(data => {
            console.log(data);
            if (data?.success) return {name: data.name, order: data.order};
            return Promise.reject(data);
        })
}