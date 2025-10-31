import { login, logout } from "../store/slice/user";
import { useAppDispatch, useAppSelector } from "./redux";

export default function useUser() {
  const { user, isLoggedIn, isAdmin } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  return {
    user,
    isLoggedIn,
    isAdmin,
    // actions
    login: (userData: UserI) => dispatch(login(userData)),
    logout: () => dispatch(logout()),
  };
}
