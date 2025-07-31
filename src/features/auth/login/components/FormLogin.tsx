import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, Formik } from "formik";
import { Eye, EyeClosed, Key, Mail } from "lucide-react";
import { useState } from "react";
import { useLoginMutation, authApi } from "@/store/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { useAppDispatch } from "@/store/hooks";

const FormLogin = () => {
  const [see, setSee] = useState<boolean>(false);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialValue = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: typeof initialValue) => {
    try {
      const result = await login(values).unwrap();
      toast.success(result.message || "Login successful!", {
        description: "Fetching your profile...",
      });
      
      // Fetch user profile and wait for it to complete
      try {
        await dispatch(authApi.endpoints.getProfile.initiate()).unwrap();
        
        // Redirect to home page after profile is loaded
        navigate({ to: "/" });
      } catch (profileError) {
        // Even if profile fetch fails, still redirect (token is valid)
        console.error("Failed to fetch profile:", profileError);
        navigate({ to: "/" });
      }
    } catch (err: any) {
      const errorMessage = err?.data?.message || err?.message || "Login failed";
      toast.error("Login failed", {
        description: errorMessage,
      });
    }
  };

  return (
    <div className="mt-4">
      <Formik initialValues={initialValue} onSubmit={handleSubmit}>
        {({ errors, values, setFieldValue, touched, setFieldTouched }) => (
          <Form>
            <div className="space-y-5">
              <div className="space-y-3">
                <Label>Email</Label>
                <div className="relative">
                  <Mail
                    className="absolute top-1/2 -translate-y-1/2 left-2"
                    size={14}
                  />
                  <Input
                    value={values.email}
                    className={`pl-8 ${errors.email && touched.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    onChange={(e) => setFieldValue("email", e.target.value)}
                    onBlur={() => setFieldTouched("email", true)}
                    placeholder="Masukkan Email..."
                  />
                </div>
                <p className="text-sm">{errors.email && errors.email}</p>
              </div>
              <div className="space-y-3">
                <Label>Password</Label>
                <div className="relative">
                  <Key
                    className="absolute top-1/2 -translate-y-1/2 left-2"
                    size={14}
                  />
                  <Input
                    type={see ? "text" : "password"}
                    className={`pl-8 ${errors.password && touched.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
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
              <div>
                <Button
                  type="submit"
                  className="cursor-pointer w-full rounded-none"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Login"}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormLogin;
