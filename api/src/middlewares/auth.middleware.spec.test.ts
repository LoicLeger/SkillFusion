import { describe, it } from 'node:test';
import assert from 'node:assert';
import { prisma } from '../models/client';
import { buildAuthedRequester } from '../../test/index';
import axios from 'axios';
import { apiBaseUrl } from '../../test/index';

describe('verifyToken', () => {
    it('should reject the request if no token is provided', async () => {
        // ARRANGE
        const requester = axios.create({
            baseURL: apiBaseUrl,
            validateStatus: () => true,
        });
        // ACT
        const httpResponse = await requester.get('/auth/me');
        // ASSERT
        assert.strictEqual(httpResponse.status, 401);
    });

    it('should reject the request if token is invalid', async () => {
        // ARRANGE
        const requester = axios.create({
            baseURL: apiBaseUrl,
            headers: { Authorization: 'Bearer invalid_token' },
            validateStatus: () => true,
        });
        // ACT
        const httpResponse = await requester.get('/auth/me');
        // ASSERT
        assert.strictEqual(httpResponse.status, 401);
    });

    it('should allow the request if token is valid', async () => {
        // ARRANGE
        await prisma.role.createMany({
        data:[
            { name: 'student', frName: 'Etudiant' },
            { name: 'instructor', frName: 'Formateur' },
            { name: 'admin', frName: 'Administrateur' },
        ]
    })
        const user = await prisma.user.create({
            data: {
                email: 'john@skillfusion.io',
                password: 'hashedpassword',
                roleId: 1,
                pseudo: 'johndoe',
            },
        });
        const authedRequester = buildAuthedRequester(user);
        // ACT
        const httpResponse = await authedRequester.get('/auth/me');
        // ASSERT
        assert.strictEqual(httpResponse.status, 200);
    });
});
