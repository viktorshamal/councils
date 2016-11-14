import { fetch, getApiUrl } from 'redux-auth';

export function createResource(path,payload,dispatch,successAction,errorAction) {
    return fetch(getApiUrl() + path, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => dispatch(successAction(data[Object.keys(payload)[0]])))
    .catch(error => dispatch(errorAction(error)));
}

export function fetchResource(path,params,dispatch,successAction,errorAction) {
    return fetch(getApiUrl() + path + '?' + queryParams(params),{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => dispatch(successAction(data)))
    .catch(error => dispatch(errorAction(error)));
}

function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}