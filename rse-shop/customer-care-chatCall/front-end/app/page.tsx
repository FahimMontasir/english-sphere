export default function Home() {
  return (
    <div className="h-screen overflow-x-hidden bg-bgwhite dark:bg-bgblack">
      <section className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="px-[10px] pt-[15px] md:px-[20px] md:pt-[30px]">
            {children}
          </main>
        </div>
      </section>
    </div>
  );
}
