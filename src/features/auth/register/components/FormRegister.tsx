import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, Formik } from "formik";
import { Eye, EyeClosed, Key, Mail } from "lucide-react";
import { useState } from "react";

const FormRegister = () => {
  const [see, setSee] = useState<boolean>(false);
  const initialValue = {
    email: "",
    password: "",
  };
  return (
    <div className="mt-4">
      <Formik initialValues={initialValue} onSubmit={(val) => console.log(val)}>
        {({ errors, values, setFieldValue }) => (
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
                    className="pl-8"
                    onChange={(e) => setFieldValue("email", e.target.value)}
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
                    className="pl-8"
                    value={values.password}
                    onChange={(e) => setFieldValue("password", e.target.value)}
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
                  type="button"
                  className="cursor-pointer w-full rounded-none"
                >
                  Login
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
