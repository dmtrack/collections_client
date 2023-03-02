import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import { shades } from '../../theme';

const Footer = () => {
    const {
        palette: { neutral },
    } = useTheme();
    return (
        <Box mt="70px" p="40px 0" sx={{ backgroundColor: neutral.light }}>
            <Box
                width="80%"
                margin="auto"
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
                rowGap="30px"
                columnGap="clamp(20px, 30px, 40px)"
            >
                <Box width="clamp(20%, 30%, 40%)">
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        mb="30px"
                        color={shades.secondary[500]}
                    >
                        Collections
                    </Typography>
                    <div>Lorem ipsum</div>
                </Box>
                <Box>
                    <Typography variant="h4" fontWeight="bold" mb="30px">
                        About Us
                    </Typography>
                    <Typography mb="30px">Careers</Typography>
                    <Typography mb="30px">OurStores</Typography>
                    <Typography mb="30px">Terms & Conditions</Typography>
                </Box>
                <Box>
                    <Typography variant="h4" fontWeight="bold" mb="30px">
                        Customer Care
                    </Typography>
                    <Typography mb="30px">Help center</Typography>
                    <Typography mb="30px">Track order</Typography>
                    <Typography mb="30px">Returns & refunds</Typography>
                </Box>
                <Box width="clamp(20%, 25%, 40%)">
                    <Typography variant="h4" fontWeight="bold" mb="30px">
                        Contact Us
                    </Typography>
                    <Typography mb="30px">
                        <a href="https://t.me/dmtrack">@dmtrack</a>
                    </Typography>
                    <Typography mb="30px">
                        <a href="mailto: dmtrack.dev@gmail.com ">
                            dmtrack.dev@gmail.com
                        </a>
                    </Typography>
                    <Typography mb="30px">
                        {' '}
                        <a href="https://github.com/dmtrack">GitHub</a>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
