import { FileUploader } from 'react-drag-drop-files';
import { useTranslation } from 'react-i18next';

interface IDragAndDrop {
    chooseFile: (file: File) => void;
    fileTypes: string[];
    hoverTitle: string;
    caption?: string;
    name: string;
    isDisabled: boolean;
}

function DragDrop({
    chooseFile,
    fileTypes,
    hoverTitle,
    name,
    isDisabled,
}: IDragAndDrop) {
    const { t } = useTranslation('translation');

    return (
        <>
            <FileUploader
                handleChange={chooseFile}
                name={name}
                types={fileTypes}
                hoverTitle={hoverTitle}
                isDisabled={isDisabled}
            />
        </>
    );
}

export default DragDrop;
