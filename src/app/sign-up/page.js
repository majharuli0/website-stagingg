"use client";
import RegisterPage from "./RegisterPage";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
export default function Page() {
  const router = useRouter();

  // const { isLogin } = useAuth();
  // if (!isLogin) {
  //   router.push("/account");
  // }
  return (
    <div className="w-full bg-white">
      {/* <RegisterImage /> */}
      <Suspense fallback={() => <>Not Found</>}>
        <RegisterPage />
      </Suspense>
    </div>
  );
}
