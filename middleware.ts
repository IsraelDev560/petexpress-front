import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  const isLoggedIn = !!token

  const pathname = request.nextUrl.pathname

  const isLoginPage = pathname.startsWith('/')

  if (request.nextUrl.pathname.startsWith('/petexpress/**') && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isLoggedIn && !isLoginPage) {
    const loginUrl = new URL('/', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/petxpress/:path*'],
};
