import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hook/redux';
import MainCarousel from './MainCarousel';
import LastItemList from './LastItemList';
import { Box } from '@mui/material';
import { PopularTagCloud } from '../../components/TagCloud/PopularTagCloud';

const Home = () => {
    return (
        <Box className='home'>
            <MainCarousel />
            <LastItemList />

            {/* {isAuth ? (
                <div className="container mx-auto  pt-5">
                    <h1 className="text-center">{t('home')}</h1>
                </div>
            ) : (
                navigate('login')
            )} */}
        </Box>
    );
};

export default Home;
