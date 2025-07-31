import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { Eye, LogOut } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { clearCredentials } from "@/store/authSlice";
import { toast } from "sonner";
import { useGetProfileQuery } from "@/store/api/authApi";
import { useGetBalanceQuery } from "@/store/api/balanceApi";
import { useEffect, useState } from "react";

interface Props {
  children?: React.ReactNode;
}

const BaseLayout = ({ children }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const [showBalance, setShowBalance] = useState(false);
  
  // Always fetch profile if we have a token but no user data
  const { data: profileData, isLoading } = useGetProfileQuery(undefined, {
    skip: !token || !!user,
  });
  
  // Fetch balance data
  const { data: balanceData } = useGetBalanceQuery(undefined, {
    skip: !token,
  });

  // This ensures profile is fetched on first load if needed
  useEffect(() => {
    if (profileData && !user) {
      // Profile data will be automatically stored via extraReducers
    }
  }, [profileData, user]);

  const handleLogout = () => {
    dispatch(clearCredentials());
    toast.success("Logged out successfully");
    navigate({ to: "/login" });
  };

  const displayName = user?.first_name && user?.last_name 
    ? `${user.first_name} ${user.last_name}`
    : user?.email || "User";
    
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Show loading skeleton while fetching user data
  if (isLoading && !user) {
    return (
      <div className="w-full min-h-screen">
        <Header />
        <div className="m-auto mt-5 px-5 lg:px-[10vw]">
          <div className="grid grid-cols-2">
            <div className="space-y-1.5">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
              <p className="text-gray-500">Selamat Datang,</p>
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      <Header />
      <div className="m-auto mt-5 px-5 lg:px-[10vw]">
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <img
              src={ "/assets/profile.png"}
              className="w-10 aspect-square rounded-full border-red-500"
              alt=""
            />
            <p className="text-gray-500">Selamat Datang,</p>
            <div className="flex gap-5 items-center">
              <h1 className="text-2xl font-semibold">{displayName}</h1>
              <Button variant={"ghost"} size={"icon"} onClick={handleLogout}>
                <LogOut className="text-red-500" />
              </Button>
            </div>
          </div>
          <div className="">
            <div className="bg-red-500 text-white p-5 rounded-xl space-y-2">
              <p className="pl-2  text-sm">Saldo Anda</p>
              <h3 className=" pl-2 font-bold text-3xl">
                {showBalance && balanceData
                  ? formatCurrency(balanceData.data.balance)
                  : "Rp •••••••••"}
              </h3>
              <div className="flex gap-2">
                <Button 
                  variant={"ghost"} 
                  size={"sm"} 
                  className="mt-2"
                  onClick={() => setShowBalance(!showBalance)}
                >
                  {showBalance ? "Tutup Saldo" : "Lihat Saldo"}
                  <Eye />
                </Button>
              </div>
            </div>
          </div>
        </div>
        {children ? children : <Outlet />}
      </div>
    </div>
  );
};

export default BaseLayout;
