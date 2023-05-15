import {
    Box,
    Typography,
    IconButton,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { shades } from '../../theme';
import { useTranslation } from 'react-i18next';
import { fetchTopAmountCollections } from '../../state/actions/collections.actions';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { useEffect } from 'react';
import { RootState } from '../../state';
import { ThemeChip } from '../../components/Common/ThemeChip';
import { useLocation, useNavigate } from 'react-router-dom';

const importAll = (r: any) =>
    r.keys().reduce((acc: any, item: any) => {
        acc[item.replace('./', '')] = r(item);
        return acc;
    }, {});

const MainCarousel = () => {
    const { searchTags } = useAppSelector((state: RootState) => state.main);
    const theme = useTheme();
    const colors = shades(theme.palette.mode);
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const { t } = useTranslation('translation', {
        keyPrefix: 'home',
    });
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchTopAmountCollections());
    }, [dispatch]);
    const { topAmountCollections } = useAppSelector(
        (state: RootState) => state.collections
    );
    const topAmountCollectionsFlat = topAmountCollections?.map((element) => {
        return {
            id: element.collectionId,
            count: element.count,
            image: element.collection.image,
            name: element.collection.name,
            theme: element.collection.themeId,
            created: element.collection.created,
        };
    });

    return (
        <Box
            sx={{
                display: 'flex',
                marginTop: isNonMobile ? '64px' : '24px',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: isNonMobile ? '0px' : '80px',
                // width: isNonMobile ? '80%' : '100%',
                width: '80%',
                flexWrap: 'wrap',
                flexDirection: isNonMobile ? 'row' : 'column',
            }}>
            <Box
                sx={{
                    flex: isNonMobile ? 1 : 0,
                    marginRight: '16px',
                }}>
                <Typography
                    fontSize='36px'
                    fontWeight='bold'
                    color={colors.secondary[800]}
                    sx={{
                        textAlign: 'left',
                        lineHeight: '1.1',
                        letterSpacing: '-1px',
                        marginRight: '16px',
                        marginTop: isNonMobile ? '0px' : '32px',
                        marginBottom: isNonMobile ? '32px' : '16px',
                    }}>
                    {t('mainTitle')}
                </Typography>
                {/* <Box display='flex'>
                    <Box width='100%'>
                        <TagsArea
                            value={searchTags}
                            setValue={(tags) => dispatch(setSearchTags(tags))}
                            freeSolo={false}
                            placeholder='tags search'
                        />
                    </Box>
                </Box> */}
            </Box>
            <Box sx={{ flex: '1' }}>
                <Carousel
                    infiniteLoop={true}
                    showThumbs={false}
                    showIndicators={false}
                    showStatus={true}
                    renderArrowPrev={(onClickHandler, hasPrev, label) => (
                        <IconButton
                            onClick={onClickHandler}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '0',
                                padding: '5px',
                                zIndex: '10',
                            }}>
                            <NavigateBeforeIcon sx={{ fontSize: 40 }} />
                        </IconButton>
                    )}
                    renderArrowNext={(onClickHandler, hasNext, label) => (
                        <IconButton
                            onClick={onClickHandler}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                right: '0',
                                padding: '5px',
                                zIndex: '10',
                            }}>
                            <NavigateNextIcon sx={{ fontSize: 40 }} />
                        </IconButton>
                    )}>
                    {topAmountCollectionsFlat
                        .slice(0, 5)
                        .map((collection, index) => (
                            <Box
                                onClick={() =>
                                    navigate(`/collections/${collection.id}`)
                                }
                                key={`carousel-image-${index}`}
                                position='relative'>
                                <img
                                    src={collection.image as string}
                                    alt={`carousel-${index}`}
                                    style={{
                                        width: '100%',
                                        height: '350px',
                                        objectFit: 'cover',
                                        backgroundAttachment: 'fixed',
                                        // borderRadius: isNonMobile ? '5px' : '0px',
                                        borderRadius: '5px',
                                    }}
                                />

                                <Box
                                    sx={{
                                        color: `${colors.primary[100]}`,
                                        backgroundColor: 'rgb(0,0,0,0.4)',
                                    }}
                                    // padding='20px'
                                    borderRadius='2px'
                                    textAlign='left'
                                    position='absolute'
                                    bottom='7%'
                                    left={isNonMobile ? '10%' : '5%'}
                                    margin={isNonMobile ? undefined : '0 auto'}
                                    maxWidth={
                                        isNonMobile ? undefined : '240px'
                                    }>
                                    <Box display='flex' flexDirection='column'>
                                        <Typography fontSize='20px'>
                                            {collection.name}
                                        </Typography>
                                        <Typography fontSize='16px'>
                                            {t('items')}: {collection.count}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    display='flex'
                                    position='absolute'
                                    bottom='5%'
                                    right='5%'>
                                    {pathname === '/' && (
                                        <ThemeChip
                                            themeId={Number(collection.theme)}
                                            color='default'
                                            backgroundColor='white'
                                            border='none'
                                        />
                                    )}
                                </Box>
                            </Box>
                        ))}
                </Carousel>
            </Box>
        </Box>
    );
};

export default MainCarousel;

declare global {
    interface NodeRequire {
        context: (
            directory: string,
            useSubdirectories: boolean,
            regExp: RegExp
        ) => any;
    }
}
