import { ChangeEvent, FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../hook/redux';
import { IUsersListProps } from '../models/IUser';
import {
    toggleBlock,
    toggleUnBlock,
    deleteUser,
} from '../state/actions/userActions';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { User } from './User';
import { shades } from '../theme';

const UsersList = ({ usersProps }: IUsersListProps) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation(['admin', 'auth']);

    const [dataId, setDataId] = useState<Array<any>>([]);

    const [checked, setChecked] = useState(false);
    const { users } = useAppSelector((state) => state.users);
    const { userId } = useAppSelector((state) => state.auth);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setChecked((prevState) => !prevState);
        if (dataId.length !== users.length) {
            const idCollection: number[] = [];
            users.forEach((u) => {
                const id = Number(u.id);
                idCollection.push(id);
            });
            setDataId(idCollection);
        } else setDataId([]);
    }

    return (
        <>
            {users.length > 0 ? (
                <div>
                    <Stack spacing={2} direction='row' mb='24px'>
                        <Button
                            color='primary'
                            variant='contained'
                            onClick={() =>
                                dispatch(toggleBlock(dataId, userId))
                            }
                            sx={{
                                backgroundColor: `${shades.secondary[800]}`,
                            }}>
                            {t('block')}
                        </Button>{' '}
                        <Button
                            sx={{
                                backgroundColor: `${shades.secondary[800]}`,
                            }}
                            variant='contained'
                            onClick={() => dispatch(toggleUnBlock(dataId))}>
                            {t('unblock')}
                        </Button>{' '}
                        <Button
                            sx={{
                                backgroundColor: `${shades.secondary[800]}`,
                            }}
                            variant='contained'
                            onClick={() =>
                                dispatch(deleteUser(dataId, userId))
                            }>
                            {t('delete')}
                        </Button>
                    </Stack>
                    <div className='relative overflow-x-auto'>
                        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400'>
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
