import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {checkLoggedIn} from "@/app/ServerActions";


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const isLoggedIn = await checkLoggedIn();
    if (!isLoggedIn.logged_in && (request.url.includes("/history"))) {
        console.log("not logged in on history")
        console.log(isLoggedIn.logged_in)
        return NextResponse.redirect(new URL("/login", request.url));
    }
    if (isLoggedIn.logged_in && (request.url.includes("/login"))) {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/history/:path*', '/login']
}