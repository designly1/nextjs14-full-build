import { cookies } from 'next/headers';

export async function GET() {
	const cookieStore = cookies();
	cookieStore.delete('userData');
	cookieStore.delete('token');

	return new Response(null, {
		status: 200,
	});
}
