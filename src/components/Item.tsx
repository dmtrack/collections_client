import { useState } from 'react';

import { Box, Typography, useTheme, Button } from '@mui/material';
import { shades } from '../theme';
import { useNavigate } from 'react-router-dom';
import { IItem, IItemProps } from '../models/IItem';

const Item: React.FC<IItemProps> = ({ item, width }: IItemProps) => {
    const navigate = useNavigate();
    const collectionName = 'collection_name';

    const [isHovered, setIsHovered] = useState(false);
    const {
        palette: { neutral },
    } = useTheme();
    const { name, image, id } = item;

    return (
        <Box width={width}>
            <Box
                position="relative"
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
            >
                <img
                    alt={item.name}
                    width="300px"
                    height="400px"
                    src={image}
                    onClick={() => navigate(`item/${id}`)}
                    style={{ cursor: 'pointer' }}
                />
                <Box
                    display={isHovered ? 'blocked' : 'none'}
                    position="absolute"
                    bottom="10%"
                    left="0"
                    width="100%"
                    padding="0 5%"
                >
                    <Box display="flex" justifyContent="space-between">
                        <Box
                            display="flex"
                            alignItems="center"
                            borderRadius="3px"
                            sx={{ backgroundColor: shades.neutral[100] }}
                        >
                            <Typography color={shades.primary[300]}>
                                info
                            </Typography>
                        </Box>
                        <Button
                            onClick={() => navigate(`item/${id}`)}
                            sx={{
                                backgroundColor: shades.primary[300],
                                color: 'white',
                            }}
                        >
                            GO
                        </Button>
                    </Box>
                </Box>
            </Box>
            {/* <Box mt="3px">
                <Typography variant="subtitle2" color={neutral.dark}>
                    {collectionName
                        .replace(/([A-Z]/g, ' $1')
                        .replace(/^./, (str) => str.toUpperCase())}
                </Typography>
                <Typography>{name}</Typography>
            </Box> */}
        </Box>
    );
};

export default Item;
