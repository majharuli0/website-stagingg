import Login from "@/components/Login";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function LoginPage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token');

  if (accessToken) {
    redirect('/account');
  }

  return (
    <div className="flex w-full items-center bg-white md:flex-col">
      {/* <RegisterImage /> */}
      <Login />
    </div>
  );
}