import { useSearch } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wallet } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useCreateTransactionMutation } from "@/store/api/transactionApi";
import { useGetBalanceQuery } from "@/store/api/balanceApi";
import Swal from "sweetalert2";

const PaymentPage = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/_authenticated/payment/" });
  const { service_code, service_name, tariff } = search as any;
  
  const [createTransaction, { isLoading }] = useCreateTransactionMutation();
  const { data: balanceData } = useGetBalanceQuery();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handlePayment = async () => {
    // Check if balance is sufficient
    if (balanceData && balanceData.data.balance < tariff) {
      await Swal.fire({
        icon: 'error',
        title: 'Saldo Tidak Cukup',
        text: `Saldo Anda ${formatCurrency(balanceData.data.balance)} tidak mencukupi untuk pembayaran ${formatCurrency(tariff)}`,
        confirmButtonColor: '#ef4444',
      });
      return;
    }

    // Confirm payment
    const result = await Swal.fire({
      title: 'Konfirmasi Pembayaran',
      html: `
        <p>Anda akan melakukan pembayaran:</p>
        <p class="font-semibold text-lg mt-2">${service_name}</p>
        <p class="text-2xl font-bold text-red-500 mt-2">${formatCurrency(tariff)}</p>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, Bayar',
      cancelButtonText: 'Batal'
    });

    if (!result.isConfirmed) return;

    try {
      const response = await createTransaction({ service_code }).unwrap();
      
      await Swal.fire({
        icon: 'success',
        title: 'Pembayaran Berhasil!',
        html: `
          <p>${response.message}</p>
          <div class="mt-3 text-left space-y-2">
            <p><strong>No. Invoice:</strong> ${response.data.invoice_number}</p>
            <p><strong>Service:</strong> ${response.data.service_name}</p>
            <p><strong>Total:</strong> ${formatCurrency(response.data.total_amount)}</p>
            <p><strong>Waktu:</strong> ${new Date(response.data.created_on).toLocaleString('id-ID')}</p>
          </div>
        `,
        confirmButtonColor: '#ef4444',
      });
      
      // Navigate back to home after successful payment
    } catch (error: any) {
      await Swal.fire({
        icon: 'error',
        title: 'Pembayaran Gagal',
        text: error?.data?.message || 'Terjadi kesalahan saat memproses pembayaran',
        confirmButtonColor: '#ef4444',
      });
    }
  };

  return (
    <div className="mt-10 max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: "/" })}
        >
          <ArrowLeft />
        </Button>
        <h2 className="text-2xl font-semibold">Pembayaran {service_name}</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Service</p>
          <p className="font-semibold">{service_name}</p>
          <p className="text-sm text-gray-600 mt-2">Tarif</p>
          <div className="flex items-center gap-3 mt-3 px-3 py-2 border rounded-lg">
            <Wallet />
            <p className="">
              {formatCurrency(tariff || 0)}
            </p>
          </div>
        </div>

        <Button
          onClick={handlePayment}
          className="w-full bg-red-500 hover:bg-red-600"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : `Bayar ${formatCurrency(tariff || 0)}`}
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
