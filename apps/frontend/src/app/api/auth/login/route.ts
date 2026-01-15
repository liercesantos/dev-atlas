import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL || 'http://localhost:3001/api/v1'}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    const nextResponse = NextResponse.json(data);

    // Forward cookies from backend to client
    const cookies = response.headers.getSetCookie();
    cookies.forEach((cookie) => {
      nextResponse.headers.append('Set-Cookie', cookie);
    });

    return nextResponse;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
