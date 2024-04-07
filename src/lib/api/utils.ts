export const baseUrl = import.meta.env.VITE_BASE_URL;

export function setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

export function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
}

export async function get(url: string): Promise<any> {
    const cookie = getCookie("access_token");
    const response = await fetch(baseUrl + url, {
        method: "GET",
        headers: {
            "Authorization": cookie ?? '',
        }
    });
    if (!response.ok) {
        if (response.status === 401)
            window.location.reload();
        else
            throw new Error(response.statusText);
    }
    return response.json();
};

export async function post(url: string, data: any): Promise<any> {
    const cookie = getCookie("access_token");
    const response = await fetch(baseUrl + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": cookie ?? '',
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
};

export async function update(url: string, data: any): Promise<any> {
    const cookie = getCookie("access_token");
    const response = await fetch(baseUrl + url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": cookie ?? '',
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
};

export async function remove(url: string): Promise<any> {
    const cookie = getCookie("access_token");
    const response = await fetch(baseUrl + url, {
        method: "DELETE",
        headers: {
            "Authorization": cookie ?? '',
        }
    });
    if (!response.ok) {
        if (response.status === 401)
            window.location.reload();
        else
            throw new Error(response.statusText);
    }
    return response.json();
};
