import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const EditCollection = () => {
    const { collectionId } = useParams();

    return <div>editCollection {collectionId}</div>;
};

export default EditCollection;
