import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const CreateItem = () => {
    const { itemId } = useParams();

    return <div>editCollection {itemId}</div>;
};

export default CreateItem;
