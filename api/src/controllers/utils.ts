import z from 'zod';

export async function parseIdFromParams(id: unknown) {
    const schema = z.coerce.number().int().min(1);
    return await schema.parseAsync(id);
}
