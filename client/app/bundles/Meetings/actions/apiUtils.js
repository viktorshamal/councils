import { fetch, getApiUrl } from 'redux-auth';
import * as actionTypes from '../actions/actionTypes.js';

export function createResource(name,path,payload,dispatch,extras={}) {
    makeCall('POST','CREATE', ...arguments);
}

export function fetchResource(name,path,params,dispatch,extras={}) {
    makeCall('GET', 'FETCH', ...arguments);
}

export function deleteResource(name,path,dispatch) {
    makeCall('DELETE','DELETE', name, path, null, dispatch, null);
}

function makeCall(method, prefix, name, path, params, dispatch, extras){
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
        .then(handleErrors)
        .then(response => response.json())
        .then(data => dispatch(fetchSuccess(prefix, name, requestId, data, extras)))
        .catch(error => dispatch(fetchError(prefix, name, requestId, error)));
}

function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
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
    let message = getMessage(prefix,name,'success');
    return action('SUCCESS', prefix, name, id, {...extras, data, message});
}

function fetchError(prefix, name, id, error) {
    let message = getMessage(prefix,name,'error');
    return action('ERROR', prefix, name, id, {error, message});
}


function getMessage(prefix,name,outcome) {
    if(messages.hasOwnProperty(name)){
        if(messages[name].hasOwnProperty(prefix)) {
            if(messages[name][prefix].hasOwnProperty(outcome)) {
                return messages[name][prefix][outcome];
            }
        }
    }

    return null;
}

const messages = {
    MEETING: {
        CREATE: {
            success: 'Møde oprettet',
            error: 'Mødet kunne ikke oprettes'
        }
    },
    MEETING_TEMPLATE: {
        CREATE: {
            success: 'Mødetype oprettet',
            error: 'Mødetypen kunne ikke oprettes'
        }
    },
    ROLE: {
        CREATE: {
            success: 'Rolle oprettet',
            error: 'Rollen kunne ikke oprettes'
        },
        DELETE: {
            success: 'Rolle fjernet',
            error: 'Rolle kunne ikke fjernes'
        }
    },
    ATTENDANCE: {
        CREATE: {
            success: 'Fremmøde gemt',
            error: 'Fremmødet kunne ikke gemmes'
        }
    }
};