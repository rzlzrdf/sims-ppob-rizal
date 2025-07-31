import { Outlet } from "@tanstack/react-router";

interface Props {
  children?: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="w-full min-h-screen grid md:grid-cols-2">
      <div className="m-auto">{children ? children : <Outlet />}</div>
      <div className="w-full hidden md:block h-screen bg-red-50 overflow-hidden relative">
        <img src="/assets/login.png" alt="" className="h-full absolute right-0" />
      </div>
    </div>
  );
};

export default AuthLayout;
