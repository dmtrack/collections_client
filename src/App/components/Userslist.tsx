import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hook/redux';

import { IUser } from '../models/IUser';

import {
    toggleBlock,
    toggleUnBlock,
    deleteUser,
} from '../store/actions/userActions';

import Button from './button';
import { User } from './User';

interface IUsersListProps {
    usersProps: IUser[];
}
const URL = process.env.REACT_APP_BASE_URL;

const UsersList = ({ usersProps }: IUsersListProps) => {
    const [dataId, setDataId] = useState<Array<any>>([]);
    const [checked, setChecked] = useState(false);

    const { users } = useAppSelector((state) => state.users);
    const { userId } = useAppSelector((state) => state.auth);

    const dispatch = useAppDispatch();

    function handleChange(): void {
        setChecked((prevState) => !prevState);
        if (dataId.length !== users.length) {
            const idCollection: number[] = [];
            users.forEach((u) => {
                idCollection.push(u.id);
            });
            setDataId(idCollection);
        } else setDataId([]);
    }

    return (
        <>
            {users.length > 0 ? (
                <div>
                    <div className="flex justify-end">
                        <Button
                            onClick={() =>
                                dispatch(toggleBlock(dataId, userId))
                            }
                            variant="warning"
                            size="sm"
                        >
                            block
                        </Button>
                        <Button
                            onClick={() =>
                                dispatch(toggleUnBlock(dataId, userId))
                            }
                            variant="info"
                            size="sm"
                        >
                            unblock
                        </Button>
                        <Button
                            onClick={() => dispatch(deleteUser(dataId, userId))}
                            variant="danger"
                            size="sm"
                        >
                            delete
                        </Button>
                    </div>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={checked}
                                            onChange={handleChange}
                                        />
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        id
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        E-mail
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        access
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Activated
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users &&
                                    users.map((user) => (
                                        <User
                                            key={user.id}
                                            user={user}
                                            dataId={dataId}
                                            setDataId={setDataId}
                                        />
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                ''
            )}
        </>
    );
};

export { UsersList };
