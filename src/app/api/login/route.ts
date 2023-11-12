import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

import { getJwtSecretKey } from '@/app/lib/server/auth';

export interface I_ApiUserLoginRequest {
	login: string;
	password: string;
}

export interface I_ApiUserLoginResponse {
	success: boolean;
	message?: string;
}

export const dynamic = 'force-dynamic';
export const jwtExpires = 60 * 60 * 24 * 7; // 7 days

const userData = {
	id: 1,
	firstName: 'John',
	lastName: 'Doe',
	email: 'john@example.com',
	phone: '+1 234 567 890',
	password: '12345', // the kind of password an idiot would have on his luggage
	role: 'user',
};

export async function POST(request: Request) {
	const body = (await request.json()) as I_ApiUserLoginRequest;

	// trim all values
	const { login, password } = Object.fromEntries(
		Object.entries(body).map(([key, value]) => [key, value.trim()]),
	) as I_ApiUserLoginRequest;

	if (!login || !password) {
		const res: I_ApiUserLoginResponse = {
			success: false,
			message: 'Either login or password is missing',
		};

		return NextResponse.json(res, { status: 400 });
	}

	try {
		// Validate login and password
		try {
			if (!userData) {
				throw new Error('User not found');
			}
			if (userData.password !== password) {
				throw new Error('Invalid password');
			}
		} catch (error) {
			let mess = 'Something went wrong';
			if (error instanceof Error) {
				mess = error.message;
			}
			console.error(`Login failed: ${mess}`);
			return NextResponse.json(
				{
					success: false,
					message: 'Invalid login or password',
				},
				{ status: 401 },
			);
		}

		const token = await new SignJWT({
			id: userData.id,
			firstName: userData.firstName,
			lastName: userData.lastName,
			email: userData.email,
			phone: userData.phone,
			role: userData.role,
		})
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.setExpirationTime(`${jwtExpires}s`)
			.sign(getJwtSecretKey());

		const res: I_ApiUserLoginResponse = {
			success: true,
		};

		const response = NextResponse.json(res);

		response.cookies.set({
			name: 'token',
			value: token,
			path: '/',
		});

		return response;
	} catch (error: any) {
		console.error(error);

		const res: I_ApiUserLoginResponse = {
			success: false,
			message: error.message || 'Something went wrong',
		};

		return NextResponse.json(res, { status: 500 });
	}
}
