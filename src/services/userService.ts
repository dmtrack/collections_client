import { IAuthResponse } from '../models/response/authResponse';
import { Axios, AxiosResponse } from 'axios';
import api from '../http';
import { IUser } from '../models/IUser';

export default class userService {
    static fetchUsers(): Promise<AxiosResponse> {
        return api.get<IUser[]>('/users/getusers');
    }
}
