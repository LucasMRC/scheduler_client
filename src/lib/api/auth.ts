// import * as mock from '../mock';
import { getCookie, setCookie, baseUrl } from './utils';

export async function login(username: string, password: string): Promise<never | User> {
    return fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(async (data) => {
            if (!data.ok) {
                throw new Error('Invalid credentials');
            }
            const token = data.headers.get('Authorization');
            if (token) {
                setCookie('access_token', token.replace('Bearer ', ''), 1);
            }
            const response = await data.json() as { user: User };
            return response.user;
        });
    // return mock.login();
}

export async function logout(): Promise<void> {
    fetch(`${baseUrl}/logout`, {
        method: 'GET',
        headers: {
            'Authorization': getCookie('access_token') ?? '',
        },
    })
        .then((data) => {
            if (data.ok) {
                setCookie('access_token', '', -1);
            }
        });
    // return Promise.resolve();
}

export async function restoreSession(): Promise<never | User> {
    return fetch(`${baseUrl}/session`, {
        method: 'GET',
        headers: {
            'Authorization': getCookie('access_token') ?? '',
        },
    })
        .then(async (data) => {
            if (!data.ok) {
                throw new Error('Invalid session');
            }
            const response = await data.json() as { user: User };
            return response.user;
        });
    // return mock.restoreSession();
}