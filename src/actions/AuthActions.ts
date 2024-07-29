'use server'
import prisma from '@/lib/prisma';
import { comparePassword, hashPassword } from '@/utils/bcryptjs';
import { generateAccessToken } from '@/utils/jose';
import { cookies } from 'next/headers';

export const signupUser = async (name: string, email: string, password: string) => {
    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return { message: 'Email already exists', status: 404 };
        }

        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        const token = await generateAccessToken(user.id, user.name, user.email);

        cookies().set("token", token, {
            maxAge: 3060,
            httpOnly: true,
            secure: false,
        })
        return { message: 'User created successfully', user, status: 201, token };
    } catch (error) {
        console.log(`Error creating user: ${error}`);
        return { message: 'Something went wrong', status: 500 };
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return { message: 'Invalid email or password', status: 404 };
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return { message: 'Invalid email or password', status: 404 };
        }

        const token = await generateAccessToken(user.id, user.name, user.email);

        cookies().set("token", token, {
            maxAge: 3060,
            httpOnly: true,
            secure: false,
        })
        return { message: 'Login successful', user, status: 201, token };
    } catch (error) {
        console.log(`Error logging in: ${error}`);
        return { message: 'Something went wrong', status: 500 };
    }
};
