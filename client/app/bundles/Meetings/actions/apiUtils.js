import { fetch, getApiUrl } from 'redux-auth';
import * as actionTypes from '../actions/actionTypes.js';

export function createResource(name,path,payload,dispatch,extras={}) {
    makeCall('POST', ...arguments);
}

export function fetchResource(name,path,params,dispatch,extras={}) {
    makeCall('GET', ...arguments);
}

function makeCall(method, name, path, params, dispatch, extras){
    let prefix = (method == 'POST' ? 'CREATE' : 'FETCH');
    let requestId = new Date().valueOf();
    dispatch(fetchStart(prefix, name, requestId));

    let url = getApiUrl() + path;
    if (method === 'GET') url += '?' + queryParams(params);

    let options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    };

    if (method === 'POST') options['body'] = JSON.stringify(params);

    return fetch(url, options)
        .then(response => response.json())
        .then(data => dispatch(fetchSuccess(prefix, name, requestId, data, extras)))
        .catch(error => dispatch(fetchError(prefix, name, requestId, error)));
}

function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

function action(type, prefix, name, id, extras={} ) {
    return {
        type: `${prefix}_${name}_${type}`,
        name,
        prefix,
        id,
        ...extras
    }
}

function fetchStart(prefix, name, id) {
    return action('START', prefix, name, id);
}

function fetchSuccess(prefix, name, id, data, extras={}) {
    let message = null;
    if(messages.hasOwnProperty(name)) message = messages[name].success;
    return action('SUCCESS', prefix, name, id, {...extras, data, message});
}

function fetchError(prefix, name, id, error) {
    let message = null;
    if(messages.hasOwnProperty(name)) message = messages[name].error;
    return action('ERROR', prefix, name, id, {error, message});
}

const messages = {
    MEETING: {
        success: 'Møde oprettet',
        error: 'Mødet kunne ikke oprettes'
    },
    MEETING_TEMPLATE: {
        success: 'Mødetype oprettet',
        error: 'Mødetypen kunne ikke oprettes'
    },
    ROLE: {
        success: 'Role oprettet',
        error: 'Rollen kunne ikke oprettes'
    }
};