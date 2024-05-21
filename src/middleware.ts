import { NextResponse, type NextRequest } from "next/server";
import { verifyJWT } from "./utils/tools";


type modulos = "dashboard" | "i+c" | "novedades"

export async function middleware(request: NextRequest) {

    const token = request.cookies.get('token') || null

    const routes: Record<modulos, RegExp[]> = {

        dashboard: [
            /^\/dashboard/,
        ],
        "i+c": [
            /^\/i\+c/,
        ],
        novedades: [
            /^\/novedades/,
        ]
    }

    if (token) {
        try {
            const verfyToken = await verifyJWT(token.value)
            if (verfyToken) {
            }

        } catch (error) {
            return NextResponse.redirect(new URL("/auth", request.nextUrl));
        }
    } else {
        if (routes.dashboard.some((route) => route.test(request.nextUrl.pathname))) {
            return NextResponse.redirect(new URL("/auth", request.nextUrl));
        }

    }

    // no permitir el acceso a las rutas sin token

    if (routes.dashboard.some((route) => route.test(request.nextUrl.pathname))) {
        console.log("dashboard");
    }


}