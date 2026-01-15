import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL || 'http://localhost:3001/api/v1'}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Cookie': `access_token=${accessToken}`
      },
    });

    const nextResponse = NextResponse.json({ message: 'Logged out successfully' });

    // Clear cookies on the client
    nextResponse.cookies.delete('access_token');
    nextResponse.cookies.delete('refresh_token');

    return nextResponse;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
