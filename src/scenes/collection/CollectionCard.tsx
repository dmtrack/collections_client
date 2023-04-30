import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { ICollection } from '../../models/ICollection';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import { shades } from '../../theme';

interface ICollectionThumb {
    collection: ICollection;
}

function CollectionCard({ collection }: ICollectionThumb) {
    const { collectionId } = useParams();
    const { t } = useTranslation(['collection_page']);
    const isNonMobile = useMediaQuery('(min-width:600px)');

    return (
        <Card sx={{ maxWidth: 345 }}>
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
                <Typography
                    gutterBottom
                    variant='h5'
                    component='div'
                    color={shades.secondary[800]}>
                    {collection.name}
                </Typography>{' '}
                <Typography
                    gutterBottom
                    variant='h6'
                    component='div'
                    color={shades.secondary[800]}>
                    {collection.themeId}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    {collection.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small'>
                    <Link to={`/collection/${collectionId}`}>GO</Link>
                </Button>
            </CardActions>
        </Card>
    );
}

export default CollectionCard;
