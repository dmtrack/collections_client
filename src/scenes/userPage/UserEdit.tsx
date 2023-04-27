import { Box } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

const UserEdit = () => {
    const { userId } = useParams();
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '128px',
                    // width: isNonMobile ? '80%' : '100%',
                    width: '80%',
                }}>
                Useredit {userId})
            </Box>
        </>
    );
};

export default UserEdit;
