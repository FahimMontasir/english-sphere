"use client"
import Navbar from "@/components/home/Navbar";
import Sidebar from "@/components/home/Sidebar";

export default function Home() {
  return (
    <div className="h-screen overflow-x-hidden bg-bgwhite dark:bg-bgblack">
      <section className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="px-[10px] pt-[15px] md:px-[20px] md:pt-[30px]">
            chat box
          </main>
        </div>
      </section>
    </div>
  );
}
