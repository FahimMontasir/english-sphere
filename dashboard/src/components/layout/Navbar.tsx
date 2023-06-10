import { useRouter } from "next/router";
import { Button } from "../common";

function Navbar() {
  const router = useRouter();
  return (
    <nav className="sticky top-0 z-[9999] h-[80px] bg-white-c">
      <div className="mx-[20px] flex h-full items-center justify-end">
        <Button variant="outlined" onClick={() => router.push("/login")}>
          LOGIN
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
