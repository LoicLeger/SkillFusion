import axios from 'axios';
import { generateAuthTokens } from '../src/lib/token';
import type { User } from '../src/models/client.ts';

export const apiBaseUrl = `http://localhost:${process.env.PORT}`;

let fakeUserId = 0;

export function generateFakeUser(user?: Partial<User>): User {
    fakeUserId++;
    return {
        id: fakeUserId,
        firstname: 'firstname',
        lastname: 'lastname',
        pseudo: `user${fakeUserId}`,
        email: `user${fakeUserId}@skillfusion.io`,
        password: 'P4$$w0rd',
        role: 0,
        note: 0,
        urlProfilImage: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...user,
    };
}

export const authedRequester = buildAuthedRequester(generateFakeUser());

export function buildAuthedRequester(user: User) {
    const { accessToken } = generateAuthTokens(user);
    return axios.create({
        baseURL: apiBaseUrl,
        headers: { Authorization: `Bearer ${accessToken.token}` },
        validateStatus: () => true,
    });
}
