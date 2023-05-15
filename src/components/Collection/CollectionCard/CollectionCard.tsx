import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ICollection } from '../../../models/ICollection';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { shades } from '../../../theme';
import { ThemeChip } from '../../Common/ThemeChip';
import { useState } from 'react';

interface ICollectionThumb {
    collection: ICollection;
    userId: number;
}

function CollectionCard({ collection, userId }: ICollectionThumb) {
    const { collectionId } = useParams();
    const { t } = useTranslation(['collectionPage']);
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = shades(theme.palette.mode);
    return (
        <Box onClick={() => navigate(`/collections/${collection.id}`)}>
            <Card
                sx={{ maxWidth: 345 }}
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}>
                <CardMedia
                    sx={{
                        height: 140,
                        letterSpacing: '-0.5px',
                        fontWeight: '600',
                        paddingLeft: isNonMobile ? '0px' : '64px',
                        borderRadius: '5px',
                    }}
                    image={collection.image}
                    title={collection.name}
                />
                <CardContent>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography
                            gutterBottom
                            variant='h5'
                            component='div'
                            color={colors.secondary[800]}>
                            {collection.name}
                        </Typography>{' '}
                        <ThemeChip themeId={Number(collection.themeId)} />
                    </Box>
                    <Typography variant='body2' color='text.secondary'>
                        {collection.description}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button size='small'>
                        <Link
                            style={{ textDecoration: 'none' }}
                            to={`/collection/${collection.id}`}>
                            GO
                        </Link>
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default CollectionCard;
