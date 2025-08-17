import { cookies } from "next/headers";

export async function getAuthCookies() {
  const cookieStore = await cookies() || null;

  return {
    accessToken: cookieStore.get("access_token")?.value || null,
    stripeCustomerId: cookieStore.get("stripeCustomerId")?.value || null,
  };
}
