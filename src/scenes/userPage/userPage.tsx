import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const UserPage = () => {
    const { userId } = useParams();
    const { t } = useTranslation(['user_page']);

    return <> UserPage {userId}</>;
};

export default UserPage;
