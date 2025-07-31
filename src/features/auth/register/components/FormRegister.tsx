import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, Formik } from "formik";
import { Eye, EyeClosed, Key, Mail, User } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";
import { toast } from "sonner";

interface RegisterFormValue {
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    repassword: string,
}

const FormRegister = () => {
  const [see, setSee] = useState<boolean>(false);
  const [seeConfirm, setSeeConfirm] = useState<boolean>(false);
  const validationScheme = Yup.object().shape({
    email: Yup.string().email().min(1),
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    password: Yup.string()
      .min(8)
      .matches(/\d/, 'Password must contain at least one number'),
    repassword: Yup.string()
      .min(8)
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });
  const initialValue:RegisterFormValue = {
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    repassword: "",
  };

  const handleSubmit = async (values: RegisterFormValue, resetForm:any) => {
    try {
      const { repassword, ...submitData } = values;
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw { data: result };
      }
      
      toast.success("Registration successful!", {
        description: result.message || "Please login with your credentials",
      });
      resetForm(initialValue)
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.message || "Registration failed";
      toast.error("Registration failed", {
        description: errorMessage,
      });
    }
  };

  return (
    <div className="mt-4">
      <Formik
        initialValues={initialValue}
        validationSchema={validationScheme}
        onSubmit={(val, {resetForm}) => handleSubmit(val, resetForm)}
      >
        {({ errors, values, touched, isValid, setFieldValue, setFieldTouched }) => (
          <Form>
            <div className="space-y-5">
              <div className="space-y-3">
                <div className="relative">
                  <Mail
                    className="absolute top-1/2 -translate-y-1/2 left-2"
                    size={14}
                  />
                  <Input
                    value={values.email}
                    className={`pl-8 ${
                      errors.email && touched.email
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                    onChange={(e) => setFieldValue("email", e.target.value)}
                    onBlur={() => setFieldTouched("email", true)}
                    placeholder="Masukkan Email..."
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="relative">
                  <User
                    className="absolute top-1/2 -translate-y-1/2 left-2"
                    size={14}
                  />
                  <Input
                    value={values.first_name}
                    className={`pl-8 ${
                      errors.first_name && touched.first_name
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                    onChange={(e) =>
                      setFieldValue("first_name", e.target.value)
                    }
                    onBlur={() => setFieldTouched("first_name", true)}
                    placeholder="Masukkan nama depan..."
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="relative">
                  <User
                    className="absolute top-1/2 -translate-y-1/2 left-2"
                    size={14}
                  />
                  <Input
                    value={values.last_name}
                    className={`pl-8 ${
                      errors.last_name && touched.last_name
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                    onChange={(e) => setFieldValue("last_name", e.target.value)}
                    onBlur={() => setFieldTouched("last_name", true)}
                    placeholder="Masukkan nama belakang..."
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="relative">
                  <Key
                    className="absolute top-1/2 -translate-y-1/2 left-2"
                    size={14}
                  />
                  <Input
                    type={see ? "text" : "password"}
                    className={`pl-8 ${
                      errors.password && touched.password
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                    value={values.password}
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    onBlur={() => setFieldTouched("password", true)}
                    placeholder="Masukkan Password..."
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    {!see ? (
                      <Eye size={14} onClick={() => setSee(!see)} />
                    ) : (
                      <EyeClosed size={14} onClick={() => setSee(!see)} />
                    )}
                  </div>
                </div>
                <p className="text-sm">{errors.password && errors.password}</p>
              </div>
              <div className="space-y-3">
                <div className="relative">
                  <Key
                    className="absolute top-1/2 -translate-y-1/2 left-2"
                    size={14}
                  />
                  <Input
                    type={seeConfirm ? "text" : "password"}
                    className={`pl-8 ${
                      errors.repassword && touched.repassword
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                    value={values.repassword}
                    onChange={(e) =>
                      setFieldValue("repassword", e.target.value)
                    }
                    onBlur={() => setFieldTouched("repassword", true)}
                    placeholder="Masukkan ulang password..."
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    {!seeConfirm ? (
                      <Eye size={14} onClick={() => setSeeConfirm(!seeConfirm)} />
                    ) : (
                      <EyeClosed size={14} onClick={() => setSeeConfirm(!seeConfirm)} />
                    )}
                  </div>
                </div>
                <p className="text-sm">
                  {errors.repassword && errors.password}
                </p>
              </div>
              <div>
                <Button
                  type="submit"
                  disabled={!isValid}
                  className="cursor-pointer w-full rounded-none"
                >
                  Register
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormRegister;
