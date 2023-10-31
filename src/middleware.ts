import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { appRoutes } from "./routes";
import { NextResponse } from "next/server";
import { Role } from "./types/role.d";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (
      request.nextUrl.pathname === appRoutes.users &&
      request.nextauth.token?.user.role !== Role.ADMINISTRADOR
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/", "/objects", "/assignments", "/users"],
};
