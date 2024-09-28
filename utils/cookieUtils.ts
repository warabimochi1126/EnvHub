export interface Cookie {
  name: string;
  value: string;
}

export function convertCookiesToHeaderString(cookies: Cookie[]): string {
  return cookies
    .map((cookie) => `${encodeURIComponent(cookie.name)}=${encodeURIComponent(cookie.value)}`)
    .join("; ");
}
