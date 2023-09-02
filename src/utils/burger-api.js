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
                localStorage.setItem("accessToken", data.accessToken.split("Bearer ")[1]);
                localStorage.setItem("refreshToken", data.refreshToken);
                return data
            }

            return Promise.reject(data)
        })
}

export const login = (email, password) => {
    return fetch(`${URL_API}/auth/login`, {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        })
    })
        .then(checkResponse)
        .then(data => {
            if (data?.success) {
                localStorage.setItem("accessToken", data.accessToken.split("Bearer ")[1]);
                localStorage.setItem("refreshToken", data.refreshToken);
                return data
            }

            return Promise.reject(data)
        })
}

export const logout = () => {
    return fetch(`${URL_API}/auth/logout`, {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        })
    })
        .then(checkResponse)
        .then(data => {
            if (data?.success) {
                localStorage.setItem("accessToken", "");
                localStorage.setItem("refreshToken", "");
                return data
            }

            return Promise.reject(data)
        })
}

export const refreshToken = () => {
    return fetch(`${URL_API}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    }).then(checkResponse);
};

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await res;
    } catch (error) {
        if (error.message === "jwt expired") {
            const refreshData = await refreshToken();
            if (!refreshData.success) return Promise.reject(refreshData);
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            options.headers.authorization = 'Bearer ' + refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(error)
        }
    }
}

export const getUserData = () => {
    return fetchWithRefresh(`${URL_API}/auth/user`, {
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: 'Bearer ' + localStorage.getItem("accessToken")
        }
    }).then(checkResponse);
}