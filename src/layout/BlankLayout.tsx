import Header from "@/components/Header";

import { Outlet } from "@tanstack/react-router";

interface Props {
  children?: React.ReactNode;
}

const BlankLayout = ({ children }: Props) => {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <div className="m-auto mt-5 px-5 lg:px-[10vw]">
        {children ? children : <Outlet />}
      </div>
    </div>
  );
};

export default BlankLayout;
