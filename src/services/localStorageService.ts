const USERID_KEY = 'USERID_KEY';
const TOKEN = 'TOKEN';
const ACCESS = 'ACCESS';
const SELECTED_LANGUAGE = 'SELECTED_LANGUAGE';
const LANGUAGE_OBJECT = 'LANGUAGE_OBJECT';

export function setToken(token: string) {
    localStorage.setItem(TOKEN, token);
}

export function setUser(userId: number, access: string) {
    localStorage.setItem(USERID_KEY, String(userId));
    localStorage.setItem(ACCESS, access);
}

export function setSelectedLanguage(language: string) {
    localStorage.setItem(SELECTED_LANGUAGE, language);
}

export function setSelectedLanguageObject(langObj: any) {
    localStorage.setItem(LANGUAGE_OBJECT, JSON.stringify(langObj));
}

export function getSelectedLanguage() {
    return localStorage.getItem(SELECTED_LANGUAGE);
}

export function getSelectedLanguageObject() {
    return localStorage.getItem(LANGUAGE_OBJECT);
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
    setSelectedLanguage,
    setSelectedLanguageObject,
    getSelectedLanguage,
    getSelectedLanguageObject,
};
export default localStorageService;
