import {
    ChangeEvent,
    ChangeEventHandler,
    ReactEventHandler,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../hook/redux';
import { IUsersListProps } from '../models/IUser';
import {
    toggleBlock,
    toggleUnBlock,
    deleteUser,
} from '../state/actions/userActions';

import Button from './button';
import { User } from './User';

const UsersList = ({ usersProps }: IUsersListProps) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation(['admin', 'auth']);

    const [dataId, setDataId] = useState<Array<any>>([]);
    const [checked, setChecked] = useState(false);
    const { users } = useAppSelector((state) => state.users);
    const { userId } = useAppSelector((state) => state.auth);
    console.log(users);

    // проверить чек боксы

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        console.log(e.target);
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
                    <div className='flex justify-end'>
                        <Button
                            onClick={() =>
                                dispatch(toggleBlock(dataId, userId))
                            }
                            variant='warning'
                            size='sm'>
                            {t('blockb')}
                        </Button>
                        <Button
                            onClick={() =>
                                dispatch(toggleUnBlock(dataId, userId))
                            }
                            variant='info'
                            size='sm'>
                            {t('unblock')}
                        </Button>
                        <Button
                            onClick={() => dispatch(deleteUser(dataId, userId))}
                            variant='danger'
                            size='sm'>
                            {t('delete')}
                        </Button>
                    </div>
                    <div className='relative overflow-x-auto'>
                        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                <tr>
                                    <th scope='col' className='px-6 py-3'>
                                        <input
                                            type='checkbox'
                                            className='checkbox'
                                            checked={checked}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        id
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        {t('auth:username')}
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        {t('auth:email')}
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        {t('access')}
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        {t('activated')}
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        {t('status')}
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
