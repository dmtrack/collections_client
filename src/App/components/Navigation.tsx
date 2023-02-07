import { Link } from 'react-router-dom';
import { useAppSelector } from '../hook/redux';
import NavProfile from './NavProfile';

export function Navigation() {
    const { isAuth } = useAppSelector((state) => state.auth);

    return (
        <nav className="flex px-5 h-[50px] bg-gray-200 justify-between opacity-70 items-center shadow-md">
            <Link to="/">students</Link>
            {isAuth && (
                <div>
                    <NavProfile />
                </div>
            )}
        </nav>
    );
}
