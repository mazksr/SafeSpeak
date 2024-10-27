import {NextFetchEvent, NextResponse} from 'next/server'
import type { NextRequest } from 'next/server'


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, event: NextFetchEvent) {
    let isLoggedIn;
    const cookie = request.cookies.get("access_token")

    event.waitUntil(
        isLoggedIn = fetch(`${process.env.API_URL}/protected`, {
        cache: "no-store",
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${cookie?.value}`
        }
    })
    )

    const loginStatus = await isLoggedIn;

    if (!loginStatus.ok && (request.url.includes("/history"))) {
        console.log("not logged in on history")
        return NextResponse.redirect(new URL("/login", request.url));
    }
    if (loginStatus.ok && (request.url.includes("/login"))) {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/history/:path*', '/login']
}