import { useForm } from "@tanstack/react-form";
import { loginSchema } from "../../validations/user";
import { useMutation } from "@tanstack/react-query";
import { login as loginFetch } from "../../api/endpoints/auth.ts";
import useUser from "../../hooks/useUser.tsx";
import { toast } from "sonner";
import toastError from "../../utils/error-toast.ts";
import Input from "../../components/Inputs";
import PasswordInput from "../../components/Inputs/PasswordInput";

export default function Login() {
  const { login: saveUser } = useUser();

  const { mutateAsync: loginUser } = useMutation({
    mutationFn: loginFetch,
    onSuccess: (data) => {
      if (!data.success) throw new Error(data.message || "Login failed");
      saveUser(data.data);
      toast.success("Login successful! Welcome back!");
    },
    onError: (error) => {
      toastError(error);
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as LoginUserI,
    validators: {
      onChange: loginSchema,
      onChangeAsyncDebounceMs: 500,
    },
    onSubmit: async (values) => {
      // Here you would typically handle the login logic, e.g., API call
      await loginUser(values.value);
    },
  });
  return (
    <>
      <h2 className="text-xl">Welcome Back !</h2>
      <p className="text-muted">Sign in to continue to your Digital Library</p>
      <form
        className="flex w-full max-w-md flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="email"
          children={(field) => (
            <Input
              field={field}
              label="Email"
              type="email"
              placeholder="Email"
              /* icons={{
								left: 'icon-[heroicons--envelope]',
							}} */
            />
          )}
        />
        <form.Field name="password">
          {(field) => (
            <PasswordInput
              field={field}
              label="Password"
              placeholder="Password"
              /* icons={{ left: 'icon-[heroicons--lock-closed]' }} */
            />
          )}
        </form.Field>
        <form.Subscribe>
          {({ canSubmit, isSubmitting }) => (
            <button
              className="btn btn-primary mt-2 w-full"
              disabled={!canSubmit}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  <span>Logging in...</span>
                </>
              ) : (
                "Login"
              )}
            </button>
          )}
        </form.Subscribe>
      </form>
    </>
  );
}
