import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hook/redux';
import MainCarousel from './MainCarousel';
import LastItemList from './LastItemList';

const Home = () => {
    const { t } = useTranslation(['home']);
    const { isAuth } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    return (
        <div className='home'>
            <MainCarousel />
            <LastItemList />

            {/* {isAuth ? (
                <div className="container mx-auto  pt-5">
                    <h1 className="text-center">{t('home')}</h1>
                </div>
            ) : (
                navigate('login')
            )} */}
        </div>
    );
};

export default Home;
