import { Dispatch, SetStateAction } from 'react';
import { IUser } from '../models/IUser';
import UserService from '../services/userService';

const getOneUser = async (
    userId: number,
    setUser: Dispatch<SetStateAction<IUser | undefined>>
) => {
    const response = await UserService.getOneUser(userId);
    response
        .mapRight(({ data: user }) => {
            setUser(user);
        })
        .mapLeft((e: any) => {
            console.error({
                type: e.response.statusText,
                code: e.response.status,
                message: e.response.data,
            });
        });
};

export default getOneUser;
