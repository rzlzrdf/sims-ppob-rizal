import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="px-5 lg:px-[10vw] py-5 flex gap-2 bg-white text-black justify-between shadow-2xs">
      <nav className="w-full flex justify-between items-center">
        <Link to="/" className="">
          <div className="flex gap-1 items-center">
            <img src="/assets/Logo.png" alt="" className="w-6" />
            <p className="font-semibold">SIMS-PPOB</p>
          </div>
        </Link>
        <div className="w-1/2 flex justify-end gap-5 items-center">
          <Link to="/topup" className="hover:text-red-500 duration-300">
            <p className="font-semibold">Top Up</p>
          </Link>
          <Link to="/transaction" className="hover:text-red-500 duration-300">
            <p className="font-semibold">Transaction</p>
          </Link>
          <Link to="/akun" className="hover:text-red-500 duration-300">
            <p className="font-semibold">Account</p>
          </Link>
        </div>
      </nav>
    </header>
  );
}
