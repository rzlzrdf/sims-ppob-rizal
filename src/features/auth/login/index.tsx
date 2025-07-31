import { Link } from "@tanstack/react-router";
import FormLogin from "./components/FormLogin";

const Index = () => {
  return (
    <main className="w-fit">
      <div className="flex justify-center items-center gap-3 mb-4">
        <img src="/assets/Logo.png" alt="" />
        <h2>SIMS PPOB</h2>
      </div>
      <h1 className="font-bold text-xl leading-loose text-center">
        Masuk atau buat akun untuk memulai
      </h1>
      <FormLogin />
      <div className="mt-4 text-center">
        Belum punya punya akun? daftar{" "}
        <Link className="text-red-500 font-semibold" to="/register">
          di sini
        </Link>
      </div>
    </main>
  );
};

export default Index;
