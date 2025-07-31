import { Outlet } from "@tanstack/react-router";

interface Props {
  children?: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="w-full min-h-screen grid grid-cols-2">
      <div className="m-auto">{children ? children : <Outlet />}</div>
      <div className="w-full h-screen bg-red-50 overflow-hidden relative">
        <img src="/assets/login.png" alt="" className="h-full absolute right-0" />
      </div>
    </div>
  );
};

export default AuthLayout;
