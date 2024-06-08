export function URLResolver(urlFor) {

    const HostURL = "http://127.0.0.1:5000";

    const APIPaths = {
        "login": "/user-management/login/",
        "logout": "/user-management/logout/",
        "create": "/user-management/create/",
        "info": "/user-management/info/",
        "update": "/user-management/update/",
    };

    return `${HostURL}${APIPaths[urlFor]}`;
}

export default async function getToken(creds) {
    try {
        const url = URLResolver("login");
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${btoa(`${creds.username}:${creds.password}`)}`,
            },
        });

        const responseData = await response.json();
        return responseData.token;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function createUser(data) {
    try {
        const url = URLResolver("create");
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log(error);
    }
}

// NOTE: This is a lower level function used by other functions, avoid using
// it directly.
export async function authenticatedRequest(
    token, resolverKey, method, includeBody=false,
    body=null, contentType="application/json", showError=true
) {
    // It is assumed that body has already been converted into corresponding
    // format for transmission.
    try {
        const url = URLResolver(resolverKey);
        const headers = {
            "Authorization": `Token ${token}`,
        }

        const requestOptions = {
            method,
            headers,
        };

        if (includeBody && body !== null) {
            requestOptions.headers["Content-Type"] = contentType;
            requestOptions.body = body;
        }

        const response = await fetch(url, requestOptions);

        // Ensure that response body is not empty.
        if ((response.body !== null) || (response.status !== 204) && (response.ok)) {
            const responseData = await response.json();
            return responseData;
        }
        
        return {"detail": "Request successful. Empty response.", "status": response.status};

    } catch (error) {
        if (showError) {
            console.log(error);
        }
        return null;
    }
}

export async function getUserInfo(token) {
    const serverResponse = await authenticatedRequest(token, 'info', 'GET');
    return serverResponse;
}

export async function updateUserInfo(token, data) {
    const serverResponse = await authenticatedRequest(token, 'update', 'PATCH',
        true, JSON.stringify(data), "application/json"
    );
    return serverResponse;
}

export async function logout(token) {
    const serverResponse = await authenticatedRequest(token, 'logout', 'POST');
    return serverResponse;
}