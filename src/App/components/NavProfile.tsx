import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hook/redux';
// import { getCurrentUserData } from '../../store/users';

const NavProfile = (): JSX.Element => {
    const { isAuth, avatarUrl, access, name, userId } = useAppSelector(
        (state) => state.auth
    );
    const { t } = useTranslation(['common', 'auth']);

    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };

    if (!isAuth) return <span>No auth</span>;
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{name}</div>
                <img
                    src={avatarUrl}
                    alt=""
                    height="60"
                    className="img-responsive rounded-circle"
                />
            </div>
            <div className={'w-50 dropdown-menu' + (isOpen ? ' show' : '')}>
                <Link to={`/users/${userId}`} className="dropdown-item">
                    {t('auth:profile')}
                </Link>
                <Link to="/logout" className="dropdown-item">
                    {t('auth:logout')}
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
