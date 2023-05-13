import Button from '../common/Button';

function Navbar() {
  return (
    <nav className="h-[80px] bg-white-c dark:bg-black-c">
      <div className="mx-[20px] flex h-full items-center justify-end">
        <Button variant="outlined">LOGIN</Button>
      </div>
    </nav>
  );
}

export default Navbar;
