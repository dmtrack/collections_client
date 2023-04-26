import { Link } from 'react-router-dom';

const NotfoundPage = () => {
    return (
        <div>
            This page is not exist. Go <Link to='/'>Home</Link>
        </div>
    );
};

export default NotfoundPage;
