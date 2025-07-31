import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, Formik } from "formik";
import { Wallet2 } from "lucide-react";
import { useTopupMutation } from "@/store/api/balanceApi";
import Swal from "sweetalert2";
import * as Yup from "yup";
const validationSchema = Yup.object({
  top_up_amount: Yup.number()
    .required("Amount is required")
    .min(10000, "Minimum topup amount is Rp 10.000")
    .max(1000000, "Maximum topup amount is Rp 1.000.000")
});

const FormTopUp = () => {
  const [topup] = useTopupMutation();
  
  const initialValues = {
    top_up_amount: 0,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = async (values: typeof initialValues, { setSubmitting }: any) => {
    try {
      const result = await topup({ top_up_amount: values.top_up_amount }).unwrap();
      
      await Swal.fire({
        icon: 'success',
        title: 'Top Up Berhasil!',
        html: `
          <p>${result.message}</p>
          <p class="text-lg font-semibold mt-2">Saldo Baru: ${formatCurrency(result.data.balance)}</p>
        `,
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'OK'
      });
      
      // Reset form after success
      values.top_up_amount = 0;
    } catch (error: any) {
      await Swal.fire({
        icon: 'error',
        title: 'Top Up Gagal',
        text: error?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.',
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'OK'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const nominalOption = [10000, 20000, 50000, 100000, 250000, 500000];

  return (
    <div className="">
      <Formik 
        initialValues={initialValues} 
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, values, setFieldValue, isSubmitting }) => (
          <Form>
            <div className="grid lg:grid-cols-2 gap-5">

              <div className="space-y-5">
                <div className="space-y-9">
                  <div className="relative">
                    <Wallet2
                      className="absolute top-1/2 -translate-y-1/2 left-2"
                      size={14}
                    />
                    <Input
                      value={values.top_up_amount || ""}
                      className="pl-8 py-2"
                      type="number"
                      onChange={(e) => setFieldValue("top_up_amount", parseInt(e.target.value) || 0)}
                      placeholder="Masukkan nominal top up..."
                    />
                  </div>
                  <p className="text-sm">{errors.top_up_amount && errors.top_up_amount}</p>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="cursor-pointer w-full rounded-none bg-red-500 hover:bg-red-600"
                    disabled={isSubmitting || !values.top_up_amount}
                  >
                    {isSubmitting ? "Processing..." : `Top Up ${values.top_up_amount ? formatCurrency(values.top_up_amount) : ""}`}
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {nominalOption.map((nominal: number, key: React.Key) => (
                  <Button
                    type="button"
                    onClick={() => setFieldValue("top_up_amount", nominal)}
                    variant={"outline"}
                    key={key}
                  >
                    {formatCurrency(nominal)}
                  </Button>
                ))}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormTopUp;
