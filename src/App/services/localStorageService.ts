const USERID_KEY = 'USERID_KEY';
const TOKEN = 'TOKEN';
const ACCESS = 'ACCESS';

export function setToken(token: string) {
    localStorage.setItem(TOKEN, token);
}

export function setUser(userId: number, access: string) {
    localStorage.setItem(USERID_KEY, String(userId));
    localStorage.setItem(ACCESS, access);
}

export function removeAuthData() {
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(ACCESS);
}

export function getUserId() {
    return localStorage.getItem(USERID_KEY);
}

export function getUserAccess() {
    return localStorage.getItem(ACCESS);
}

const localStorageService = {
    setToken,
    getUserId,
    removeAuthData,
    setUser,
    getUserAccess,
};
export default localStorageService;
