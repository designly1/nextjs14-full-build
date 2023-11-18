// pnpm i cookie \ pnpm i -D @types/cookie
import cookie from 'cookie';

export function getUserData() {
	const cookies = cookie.parse(document.cookie);
	const { userData } = cookies;

	// Check if userData exists and is a string
	if (!userData || typeof userData !== 'string') return null;

	try {
		return JSON.parse(userData);
	} catch (error) {
		return null;
	}
}
