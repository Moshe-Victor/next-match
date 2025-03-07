import {authRoutes, publicRoutes} from "@/routes";
import {NextResponse} from "next/server";

import { auth } from "@/auth"

export default auth((req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;

    const isPublic = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if(isPublic) {
        return NextResponse.next();
    }

    if(isAuthRoute) {
        if(isLoggedIn) {
            return NextResponse.redirect(new URL('/members', req.nextUrl));
        }
        return NextResponse.next();
    }

    if(!isPublic && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    return NextResponse.next();
})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
}