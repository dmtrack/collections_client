import React from 'react';
import { IUser } from '../models/IUser';
import { Link } from 'react-router-dom';

interface IUserProps {
    user: IUser;
    dataId: number[];
    setDataId: any;
}

function User({ user, dataId, setDataId }: IUserProps) {
    const { id, name, email, blocked, isActivated } = user;
    const { access } = user.access;

    const chooseCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = parseInt(e.target.value);
        if (dataId.includes(id)) {
            const idCollection = dataId.filter((el) => el !== id);
            setDataId(idCollection);
        } else {
            const idCollection = [...dataId];

            idCollection.push(id);
            setDataId(idCollection);
        }
    };

    return (
        <>
            <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                <td className='px-6 py-3'>
                    <input
                        type='checkbox'
                        value={id}
                        id={String(id)}
                        checked={dataId.includes(Number(id)) ? true : false}
                        onChange={chooseCheckbox}
                    />
                </td>
                <td className='px-5 py-4'>{id}</td>
                <td className='px-5 py-4'>
                    <Link to={`/user/${id}`}>{name}</Link>
                </td>
                <td className='px-5 py-4'>{email}</td>
                <td className='px-5 py-4'>{access}</td>
                <td className='px-5 py-4'>{isActivated ? 'yes' : 'no'}</td>
                <td className='px-5 py-4'>{blocked ? 'blocked' : 'active'}</td>
            </tr>
        </>
    );
}

export { User };
