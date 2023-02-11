import { Link } from 'react-router-dom';
import { useAppSelector } from '../hook/redux';
import NavProfile from './NavProfile';
import Button from '../components/button';

export interface INavigationProps {
    switchLang: () => any;
    selectedLanguage: string;
}

export const Navigation: React.FC<INavigationProps> = (
    props: INavigationProps
) => {
    const { switchLang, selectedLanguage } = props;
    const { isAuth } = useAppSelector((state) => state.auth);

    return (
        <nav className="flex px-5 h-[50px] bg-gray-200 justify-between opacity-70 items-center shadow-md">
            <Link to="/">Collections</Link>
            <Button
                onClick={switchLang}
                variant="danger"
                size="sm"
                type="submit"
            >
                {selectedLanguage}
            </Button>
            {isAuth && (
                <div>
                    {' '}
                    <NavProfile />
                </div>
            )}
        </nav>
    );
};
