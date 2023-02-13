import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hook/redux';
import NavProfile from '../../components/NavProfile';
import Language from '../../components/Languages';
import { useTranslation } from 'react-i18next';

export const Navigation = () => {
    const { t } = useTranslation(['common']);

    const { isAuth } = useAppSelector((state) => state.auth);

    return (
        <nav className="flex px-5 h-[50px] bg-gray-200 justify-between opacity-70 items-center shadow-md">
            <Link to="/">{t('collection')}</Link>
            {<Language />}
            {isAuth && (
                <div>
                    {' '}
                    <NavProfile />
                </div>
            )}
        </nav>
    );
};
