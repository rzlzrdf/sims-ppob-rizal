import { Link } from "@tanstack/react-router";
import FormRegister from "./components/FormRegister";

const Index = () => {
  return (
    <main className="w-fit">
      <div className="flex justify-center items-center gap-3 mb-4">
        <img src="/assets/Logo.png" alt="" />
        <h2>SIMS PPOB</h2>
      </div>
      <h1 className="font-bold text-xl leading-loose text-center">
        Lengkapi data untuk membuat akun
      </h1>
      <FormRegister />
      <div className="mt-4 text-center">
        Sudah punya akun? login <Link className="text-red-500 font-semibold" to="/login">di sini</Link>
      </div>
    </main>
  );
};

export default Index;
