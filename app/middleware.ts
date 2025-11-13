import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    //  Allow public routes (no auth needed)
    const publicRoutes = ["/login", "/"];
    const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

    //  If logged in and trying to visit login → redirect to dashboard
    if (token && isPublicRoute) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    //  If not logged in and trying to access protected route → redirect to login
    const protectedRoutes = [
        "/dashboard",
        "/employee",
        "/device",
        "/report",
        "/attendance",
        "/system",
    ];

    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
