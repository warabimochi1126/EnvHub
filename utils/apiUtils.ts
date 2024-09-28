import { convertCookiesToHeaderString, Cookie } from "./cookieUtils";

export async function fetchWithCookies(url: string, cookies: Cookie[]) {
  const cookieString = convertCookiesToHeaderString(cookies);

  const response = await fetch(url, {
    headers: { Cookie: cookieString },
    credentials: "include",
  });

  return response;
}
