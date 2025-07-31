import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, Formik } from "formik";
import { User, Mail } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCredentials, setCredentials } from "@/store/authSlice";
import { toast } from "sonner";
import * as Yup from "yup";
import { useNavigate } from "@tanstack/react-router";

interface ProfileFormValue {
  first_name: string;
  last_name: string;
}

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
});

const FormEditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(clearCredentials());
    toast.success("Logged out successfully");
    navigate({ to: "/login" });
  };

  const initialValues: ProfileFormValue = {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
  };

  const handleSubmit = async (values: ProfileFormValue, resetForm: any) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/profile/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw { data: result };
      }
      if (user && token) {
        dispatch(
          setCredentials({
            user: {
              ...user,
              first_name: values.first_name,
              last_name: values.last_name,
            },
            token: token,
          })
        );
      }
      toast.success("Registration successful!", {
        description: result.message || "Please login with your credentials",
      });
      resetForm(initialValues);
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || error?.message || "Registration failed";
      toast.error("Registration failed", {
        description: errorMessage,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6 space-y-6">
      {/* Profile Avatar */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <img
            src="/assets/profile.png"
            className="w-20 h-20 rounded-full border-2 border-gray-200"
            alt="Profile"
          />
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          {user?.first_name} {user?.last_name}
        </h2>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({
          errors,
          values,
          touched,
          setFieldValue,
          setFieldTouched,
          isSubmitting,
        }) => (
          <Form className="space-y-4">
            {/* Email (Read-only) */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Email</Label>
              <div className="relative">
                <Mail
                  className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400"
                  size={16}
                />
                <Input
                  value={user?.email || ""}
                  className="pl-10 bg-gray-50"
                  placeholder="Email"
                  disabled
                />
              </div>
            </div>

            {/* First Name */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">
                Nama Depan
              </Label>
              <div className="relative">
                <User
                  className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400"
                  size={16}
                />
                <Input
                  value={values.first_name}
                  className={`pl-10 ${
                    errors.first_name && touched.first_name
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                  onChange={(e) => setFieldValue("first_name", e.target.value)}
                  onBlur={() => setFieldTouched("first_name", true)}
                  placeholder="Kristanto"
                />
              </div>
              {errors.first_name && touched.first_name && (
                <p className="text-sm text-red-500">{errors.first_name}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">
                Nama Belakang
              </Label>
              <div className="relative">
                <User
                  className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400"
                  size={16}
                />
                <Input
                  value={values.last_name}
                  className={`pl-10 ${
                    errors.last_name && touched.last_name
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                  onChange={(e) => setFieldValue("last_name", e.target.value)}
                  onBlur={() => setFieldTouched("last_name", true)}
                  placeholder="Wibowo"
                />
              </div>
              {errors.last_name && touched.last_name && (
                <p className="text-sm text-red-500">{errors.last_name}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Edit Profil"}
            </Button>

            {/* Logout Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full border-red-500 text-red-500 hover:bg-red-50 py-3 rounded-md"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormEditProfile;
