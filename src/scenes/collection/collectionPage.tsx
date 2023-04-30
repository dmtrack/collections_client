import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

const CollectionPage = () => {
    const { collectionId } = useParams();
    const { t } = useTranslation(['collection_page']);

    return (
        <>
            <div>Collection with id:{collectionId}</div>
            <Link to={`/collection/${collectionId}/edit`}>Edit collection</Link>
        </>
    );
};

export default CollectionPage;
