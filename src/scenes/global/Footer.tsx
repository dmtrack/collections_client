import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import { shades } from '../../theme';
import { useLocation } from 'react-router-dom';

const Footer = () => {
    const { pathname } = useLocation();
    const {
        palette: { neutral },
    } = useTheme();
    return (
        <>
            {pathname === '/admin' || pathname === '/login' ? null : (
                <Box
                    mt='64px'
                    p='24px 0'
                    sx={{
                        backgroundColor: neutral.light,
                        bottom: '0',
                        width: '100%',
                    }}>
                    <Box
                        width='80%'
                        margin='auto'
                        display='flex'
                        justifyContent='space-between'
                        flexWrap='wrap'
                        rowGap='20px'
                        columnGap='clamp(16px, 32px, 48px)'>
                        <Box width='clamp(20%, 30%, 40%)'>
                            <Typography
                                variant='h6'
                                fontWeight='bold'
                                mb='12px'>
                                Collections
                            </Typography>
                        </Box>
                        {/* <Box>
                    <Typography variant='h5' fontWeight='bold' mb='30px'>
                        About Us
                    </Typography>
                    <Typography mb='30px'>Careers</Typography>
                    <Typography mb='30px'>OurStores</Typography>
                    <Typography mb='30px'>Terms & Conditions</Typography>
                </Box>
                <Box>
                    <Typography variant='h5' fontWeight='bold' mb='30px'>
                        Customer Care
                    </Typography>
                    <Typography mb='30px'>Help center</Typography>
                    <Typography mb='30px'>Track order</Typography>
                    <Typography mb='30px'>Returns & refunds</Typography>
                </Box> */}
                        <Box width='clamp(20%, 25%, 40%)'>
                            <Typography
                                variant='h6'
                                fontWeight='bold'
                                mb='12px'>
                                Contacts
                            </Typography>
                            <Typography mb='12px'>
                                <a href='https://t.me/dmtrack'>@dmtrack</a>
                            </Typography>
                            {/* <Typography mb='10px'>
                        <a href='mailto: dmtrack.dev@gmail.com '>
                            dmtrack.dev@gmail.com
                        </a>
                    </Typography> */}
                            <Typography mb='12px'>
                                {' '}
                                <a href='https://github.com/dmtrack'>GitHub</a>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default Footer;
