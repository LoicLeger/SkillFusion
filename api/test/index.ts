import axios from 'axios';
import { generateAuthTokens } from '../src/lib/token';
import type { User } from '../src/models/client.ts';

export const apiBaseUrl = `http://localhost:${process.env.PORT}`;

let fakeUserId = 0;

export function generateFakeUser(user?: Partial<User>): Partial<User> {
    if(user){
        return user
    }
    fakeUserId++;
    return {
        id: fakeUserId,
        firstname: 'firstname',
        lastname: 'lastname',
        pseudo: `user${fakeUserId}`,
        email: `user${fakeUserId}@skillfusion.io`,
        password: 'P4$$w0rd',
        roleId: 1,
        urlProfilImage: null,
        createdAt: new Date(),
        updatedAt: new Date()
    };
}

export const authedRequester = buildAuthedRequester(generateFakeUser());

export function buildAuthedRequester(user: User) {
    const response = generateAuthTokens(user);
    return axios.create({
        baseURL: apiBaseUrl,
        headers: { Authorization: `Bearer ${response.accessToken.token}` },
        validateStatus: () => true,
    });
}
