const USERID_KEY = 'USERID_KEY';
const TOKEN = 'TOKEN';
const ACCESS = 'ACCESS';
const THEME = 'APP_THEME';
const LANG = 'APP_LANGUAGE';

export function setToken(token: string) {
    localStorage.setItem(TOKEN, token);
}

export function setUser(userId: number, access: string) {
    localStorage.setItem(USERID_KEY, String(userId));
    localStorage.setItem(ACCESS, access);
}

export function setTheme(theme: string) {
    localStorage.setItem(THEME, theme);
}
export function setLanguage(language: string) {
    localStorage.setItem(LANG, language);
}

export function getSelectedLanguage() {
    console.log('get theme');

    return localStorage.getItem(LANG);
}
export function getSelectedTheme() {
    return localStorage.getItem(THEME);
}

// export function getSelectedLanguageObject() {
//     return localStorage.getItem(LANGUAGE_OBJECT);
// }

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
    setTheme,
    setLanguage,
    getUserId,
    removeAuthData,
    setUser,
    getUserAccess,
    getSelectedLanguage,
    getSelectedTheme,
};
export default localStorageService;
