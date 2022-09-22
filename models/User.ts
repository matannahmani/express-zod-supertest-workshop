import { z } from 'zod';
import { faker } from '@faker-js/faker';
import { createHash } from 'crypto';
import jwt from 'jsonwebtoken';

export const UserZod = z.object({
    _id: z.string(),
    name: z.string(),
    password: z.string(),
}).strict();

export type User = z.infer<typeof UserZod> & {
    validatePassword: (password: string) => boolean;
    generateToken: () => string;
};

const generateToken = (id: User['_id']) => {
    return jwt.sign({
        _id: id
    }, `${process.env.JWT_SECRET}`);
}

const validatePassword = (password: string, input: string) => {
    const hash = createHash('sha256');
    hash.update(input);
    return hash.digest('base64url') === password;
}

export const UserDB: User[] = new Array(100).fill(0).map((_, i) => {
    const password = createHash('sha256').update(i.toString()).digest('base64url')
    return {
    _id: i.toString(),
    password,
    name: faker.name.firstName(),
    validatePassword: (input: string) => validatePassword(password, input),
    generateToken: () => generateToken(i.toString()),
    }
});
UserDB