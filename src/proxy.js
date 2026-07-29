import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
       
        const currentUrl = request.nextUrl.pathname + request.nextUrl.search
        
        
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('callbackUrl', currentUrl)
        
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
  matcher: [
    '/profile',
    '/ideas/:path',
    '/add-idea',
    '/my-interactions',
    '/my-ideas',
  ],
}