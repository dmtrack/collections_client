import React from 'react';
import i18n from '../i18n';

const Language = (): JSX.Element => {
    const language = localStorage.getItem('i18nextLng') || 'en';
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(e.target.value);
    };

    return (
        <select value={language} onChange={handleLanguageChange}>
            <option value="en">en</option>
            <option value="ru">ru</option>
        </select>
    );
};

export default Language;
