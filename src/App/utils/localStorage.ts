const USERID_KEY = 'USERID_KEY';

type SetUserProps = {
    userId: string;
};

export function setUser({ userId }: SetUserProps) {
    localStorage.setItem(USERID_KEY, String(userId));
}

export function removeAuthData() {
    localStorage.removeItem(USERID_KEY);
}

export function getUserId() {
    return localStorage.getItem(USERID_KEY);
}
const localStorageService = {
    getUserId,
    removeAuthData,
    setUser,
};
export default localStorageService;
