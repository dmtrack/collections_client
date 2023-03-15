import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { shades } from '../../theme';

const importAll = (r: any) =>
    r.keys().reduce((acc: any, item: any) => {
        console.log(r, 'r');

        acc[item.replace('./', '')] = r(item);
        return acc;
    }, {});

const heroTextureImports = importAll(
    require.context('../../assets/images/', false, /\.(jpe?g|png|svg)$/)
);

const MainCarousel = () => {
    const isNonMobile = useMediaQuery('(min-width:600px)');

    return (
        <Box
            sx={{
                display: 'flex',
                margin: '64px auto',
                width: '80%',
                flexWrap: 'wrap',
                flexDirection: isNonMobile ? 'row' : 'column',
            }}>
            <Box
                sx={{
                    backgroundColor: 'white',
                    flex: 1,
                    marginRight: '16px',
                }}>
                <Typography
                    variant='h2'
                    fontWeight='bold'
                    color={shades.secondary[800]}
                    sx={{
                        textAlign: 'left',
                        lineHeight: '1.1',
                        letterSpacing: '-1px',
                        paddingBottom: isNonMobile ? '0px' : '32px',
                    }}>
                    The Collections save your the most valuable
                </Typography>
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
                    {Object.values(heroTextureImports).map((texture, index) => (
                        <Box key={`carousel-image-${index}`}>
                            <img
                                src={texture as string}
                                alt={`carousel-${index}`}
                                style={{
                                    width: '100%',
                                    height: '350px',
                                    objectFit: 'cover',
                                    backgroundAttachment: 'fixed',
                                    borderRadius: '5px',
                                }}
                            />
                            <Box
                                sx={{
                                    color: 'white',
                                    backgroundColor: 'rgb(0,0,0,0.4)',
                                }}
                                padding='20px'
                                borderRadius='2px'
                                textAlign='left'
                                position='absolute'
                                top='70%'
                                left={isNonMobile ? '10%' : '0'}
                                right={isNonMobile ? undefined : '0'}
                                margin={isNonMobile ? undefined : '0 auto'}
                                maxWidth={isNonMobile ? undefined : '240px'}>
                                <Typography
                                    color={shades.secondary[200]}></Typography>
                                <Typography variant='h4'>Theme</Typography>
                                <Typography variant='h6'>items: 5</Typography>

                                <Typography
                                    fontWeight='bold'
                                    color={shades.secondary[300]}
                                    // sx={{ textDecoration: 'underline' }}
                                >
                                    Owner
                                </Typography>
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
