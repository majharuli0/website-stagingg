"use client";
import PaymentFailure from "@/components/PaymentFailure";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const router = useRouter();
  const [isUserVerified, setIsUserVerified] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const verified =
        JSON.parse(localStorage.getItem("isUserVerified")) || false;
      setIsUserVerified(verified);
      if (!verified) {
        router.push("/");
      }
    }
  }, [router]);

  return (
    <div>
      {/* <AccountComplete /> */}
      {/* <PaymentSuccess />  */}
      <PaymentFailure />
    </div>
  );
}

export default Page;
