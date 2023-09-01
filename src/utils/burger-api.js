const URL_API = "https://norma.nomoreparties.space/api";

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
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ingredients: ingredientsIds
        })
    })
        .then(checkResponse)
        .then(data => {
            if (data?.success) return { name: data.name, order: data.order };
            return Promise.reject(data);
        })
}

export const forgotPassword = (email) => {
    return fetch(`${URL_API}/password-reset`, {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email
        })
    })
        .then(checkResponse)
        .then(data => {
            if (data?.success) return data;
            return Promise.reject(data);
        })
}

export const resetPassword = (password, token) => {
    return fetch(`${URL_API}/password-reset/reset`, {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password,
            token
        })
    })
        .then(checkResponse)
        .then(data => {
            if (data?.success) return data;
            return Promise.reject(data);
        })
}

export const register = (email, password, name) => {
    return fetch(`${URL_API}/auth/register`, {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            password,
        })
    })
    .then(checkResponse)
        .then(data => {
            if (data?.success) {
                localStorage.setItem("accesToken", data.accessToken.split("Bearer ")[1]);
                localStorage.setItem("refreshToken", data.refreshToken);
                return data
            }

            return Promise.reject(data)
        })
}