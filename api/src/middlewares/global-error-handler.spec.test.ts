import assert from 'node:assert';
import { describe, it } from 'node:test';
import { prisma } from '../models/client';
import { authedRequester } from '../../test/index';
import logger from '../lib/logger';

describe('globalErrorHandler', () => {
    const safePrismaUserFindUnique = prisma.user.findUnique;

    it('should return a 500 when database is failing', async () => {
        // ARRANGE
        prisma.user.findUnique = () => {
            throw new Error('Database error');
        };
        it.mock.method(logger, 'error', () => {});

        // ACT
        const httpResponse = await authedRequester.post('/auth/register', {
            email: 'john@skillfusion.io',
            pseudo: 'jojoDu41',
            password: 'P4$$w0rd1234!',
            confirmPassword: 'P4$$w0rd1234!',
        });

        // ASSERT
        assert.strictEqual(httpResponse.status, 500);
        assert.strictEqual(httpResponse.data.status, 500);
        assert.strictEqual(httpResponse.data.error, 'Internal server error');

        // CLEAN UP
        prisma.user.findUnique = safePrismaUserFindUnique;
    });
});
