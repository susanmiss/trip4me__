export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/categories`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const create = (token, category) => {
    return fetch(`${process.env.REACT_APP_API_URL}/category/create`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: category
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
}


export const singleCategory = (categoryId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/category/${categoryId}`, {
        method: "GET",
        headers: {
            Accept: " application/json"
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
}



export const remove = (categoryId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/category/${categoryId}`, {
        method: "DELETE",
        headers: {
            Accept: " application/json",
            "Content-type": " application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
}

export const update = (categoryId, token, category) => {
    return fetch(`${process.env.REACT_APP_API_URL}/category/${categoryId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: category
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

