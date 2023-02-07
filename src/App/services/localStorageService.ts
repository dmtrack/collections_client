const USERID_KEY = 'USERID_KEY';
const TOKEN = 'TOKEN';

export function setToken(token: string) {
    localStorage.setItem(TOKEN, token);
}

export function setUser(userId: number) {
    localStorage.setItem(USERID_KEY, String(userId));
}

export function removeAuthData() {
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(TOKEN);
}

export function getUserId() {
    return localStorage.getItem(USERID_KEY);
}
const localStorageService = {
    setToken,
    getUserId,
    removeAuthData,
    setUser,
};
export default localStorageService;
