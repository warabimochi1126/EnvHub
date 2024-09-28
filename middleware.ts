import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";
import { createClient } from "./lib/supabase/server";

export async function middleware(request: NextRequest) {
  const supabase = createClient();

  const isLoggedIn = !!(await supabase.auth.getUser()).data.user;
  const accessedPath = request.nextUrl.pathname;

  if (
    !isLoggedIn &&
    (accessedPath.startsWith("/share/get") ||
      accessedPath.startsWith("/share/post") ||
      accessedPath.startsWith("/repository"))
  ) {
    // 時間経過によるprovider_tokenの失効を永続化させる
    await updateSession(request);

    return NextResponse.redirect(new URL("/", request.url));
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
