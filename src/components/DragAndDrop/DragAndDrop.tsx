import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { fileTypes } from '../../utils/constants';
import { t } from 'i18next';

function DragDrop() {
    const [file, setFile] = useState<File | null>(null);
    const handleChange = (file: File) => {
        setFile(file);
        console.log(file);
    };
    return (
        <FileUploader
            handleChange={handleChange}
            name='file'
            types={fileTypes}
            hoverTitle={t('Drop here')}
        />
    );
}

export default DragDrop;
