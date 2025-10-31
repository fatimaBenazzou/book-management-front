import { userSchema } from "../../validations/user";
import axiosConfig from "../config";

export async function login({
  email,
  password,
  rememberMe,
}: LoginUserI & { rememberMe?: boolean }) {
  const response = await axiosConfig.post<ResponseI<UserI>>("/auth/login", {
    email,
    password,
  });

  const data = response.data;

  if (data.success && data.data) {
    const validatedUser = userSchema.parse(data.data);

    if (data.token) {
      if (rememberMe) localStorage.setItem("token", data.token);
      sessionStorage.setItem("token", data.token);
    }

    return { ...data, data: validatedUser };
  }

  return data;
}

export async function register({
  email,
  password,
  firstName,
  lastName,
}: RegisterUserI) {
  const response = await axiosConfig.post<ResponseI<UserI>>("/auth/register", {
    email,
    password,
    firstName,
    lastName,
  });

  const data = response.data;

  // Validate the user data with Zod if success
  if (data.success && data.data) {
    const validatedUser = userSchema.parse(data.data);

    if (data.token) {
      sessionStorage.setItem("token", data.token);
    }

    return { ...data, data: validatedUser };
  }

  return data;
}

export async function logout() {
  // Backend doesn't have logout endpoint, just clear tokens
  sessionStorage.removeItem("token");
  localStorage.removeItem("token");
  return { success: true, message: "Logged out successfully" };
}

export async function checkAuth() {
  const response = await axiosConfig.get<ResponseI<UserI>>("/auth");
  const data = response.data;

  // Validate the user data with Zod if success
  if (data.success && data.data) {
    const validatedUser = userSchema.parse(data.data);
    return { ...data, data: validatedUser };
  }

  return data;
}
