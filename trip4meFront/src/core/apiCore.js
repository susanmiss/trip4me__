import queryString from 'query-string';


export const list = params => {
    const query = queryString.stringify(params);
    console.log('query: ', query);
    return fetch(`${process.env.REACT_APP_API_URL}/posts/search?${query}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};