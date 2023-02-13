import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hook/redux';

const Home = () => {
    const { t } = useTranslation(['home']);
    const { isAuth } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    return (
        <>
            Home
            {/* {isAuth ? (
                <div className="container mx-auto  pt-5">
                    <h1 className="text-center">{t('home')}</h1>
                </div>
            ) : (
                navigate('login')
            )} */}
        </>
    );
};

export default Home;
