'use server'
import { User } from '@prisma/client';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const jwtSecret = process.env.JWT_SECRET

const secretKey = new TextEncoder().encode(jwtSecret);

export async function generateAccessToken(id: string, name: string, email: string): Promise<string> {
    const payload = { id, name, email };

    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' }) // HS256 algorithm for signing
        .setExpirationTime('1h') // 1 hour expiration
        .sign(secretKey);
    return token;
}



export async function getIdAcessToken(token: string): Promise<string | null> {
    try {
        const { payload } = await jwtVerify(token, secretKey, {
            algorithms: ["HS256"],
        });
        //@ts-ignore
        return payload;
    } catch (error) {
        console.error('Invalid JWT:', error);
        return null;
    }
}

export async function getUserInfo() {
    try {
        const token = cookies().get("token")?.value || ""
        const { payload } = await jwtVerify(token, secretKey, {
            algorithms: ["HS256"],
        });
        //@ts-ignore
        return payload;
    } catch (error) {
        console.log(error)
        return null

    }
}
