function Nav() {
  return (
    <header className="mx-auto flex items-center justify-between">
      <div className="home__nav-box flex bg-white">
        <h1 className="text-2xl text-primary">logo</h1>
        <h2 className="text-xl">
          text Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Dolorem, eveniet?
        </h2>
      </div>
      <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
        download now
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          className="w-4 h-4 ml-1"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </button>
    </header>
  );
}

export default Nav;
