import axios from 'axios';
import { cookies } from 'next/headers';

export async function getServerAxios() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_REST_API_URL || 'http://localhost:3001/api/v1',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `access_token=${accessToken}`,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });
}
