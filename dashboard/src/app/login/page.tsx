"use client";
import { Button, Image } from "@/components/common";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  return (
    <div className="flex h-screen flex-wrap items-center justify-center overflow-x-hidden bg-bgwhite md:gap-[60px]">
      <Image
        className="h-[300px] w-[100%] rounded-rounded-md md:h-[500px] md:w-[500px]"
        src="/static/pictures/login.png"
        alt="Login image of RSE dashboard"
      />
      <div className="mx-2 flex w-full flex-col items-end justify-center gap-3 md:mx-0 md:h-[500px] md:w-[500px]">
        <input
          type="text"
          placeholder="Type your email here..."
          className="h-[50px] w-full rounded-rounded-md bg-white-c p-[22px] text-black-c placeholder-gray-600 shadow-default focus:outline-none"
        />
        <input
          type="password"
          placeholder="Type your password here..."
          className="h-[50px] w-full rounded-rounded-md bg-white-c p-[22px] text-black-c placeholder-gray-600 shadow-default focus:outline-none"
        />
        <Button className="h-[50px]" onClick={() => router.push("/dashboard")}>
          LOG IN
        </Button>
      </div>
    </div>
  );
}
export default Login;
