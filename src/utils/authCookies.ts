import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getAuthCookies() {
  const cookieStore = await cookies();

  return {
    accessToken: cookieStore.get("access_token").value || null,
    stripeCustomerId: cookieStore.get("stripeCustomerId").value || null,
  };
}
