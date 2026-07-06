import { Role } from '../models/client.ts';

export interface IUser {
    id: number;
    email: string;
    firstname?: string;
    lastname?: string;
    pseudo: string;
    password: string;
    urlProfilImage?: string;
    role: Role;
}
