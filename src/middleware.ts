import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

import { verifyJwtToken } from './lib/server/auth';

const authRoutes = ['/dashboard/*', '/api/me/*'];

function matchesWildcard(path: string, pattern: string): boolean {
	if (pattern.endsWith('/*')) {
		const basePattern = pattern.slice(0, -2);
		return path.startsWith(basePattern);
	}
	return path === pattern;
}

export async function middleware(request: NextRequest) {
	const LOGIN = `${process.env.NEXT_PUBLIC_BASE_URL}/login?redirect=${
		request.nextUrl.pathname + request.nextUrl.search
	}`;

	if (authRoutes.some(pattern => matchesWildcard(request.nextUrl.pathname, pattern))) {
		const token = request.cookies.get('token');

		if (!token) {
			return NextResponse.redirect(LOGIN);
		}

		try {
			const payload = await verifyJwtToken(token.value);

			if (!payload) {
				// Delete token
				request.cookies.delete('token');
				return NextResponse.redirect(LOGIN);
			}
		} catch (error) {
			// Delete token
			request.cookies.delete('token');
			return NextResponse.redirect(LOGIN);
		}
	}

	let redirectToApp = false;
	// Redirect login to app if already logged in
	if (request.nextUrl.pathname === '/login') {
		const token = request.cookies.get('token');

		if (token) {
			try {
				const payload = await verifyJwtToken(token.value);

				if (payload) {
					redirectToApp = true;
				} else {
					// Delete token
					request.cookies.delete('token');
				}
			} catch (error) {
				// Delete token
				request.cookies.delete('token');
			}
		}
	}

	if (redirectToApp) {
		return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`);
	} else {
		return NextResponse.next();
	}
}
