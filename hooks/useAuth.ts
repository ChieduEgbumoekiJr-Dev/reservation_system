import { useContext } from "react";
import { axiosAuth } from "../utils/axiosConfig";
import { AuthenticationContext } from "../context/AuthContext";
import { deleteCookie } from "cookies-next";

const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);
  const signin = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      loading: false,
      formLoading: true,
      error: null,
    });
    try {
      const payload = {
        email,
        password,
      };
      const response = await axiosAuth.post("/signin", payload);
      setAuthState({
        data: response.data,
        loading: false,
        formLoading: false,
        error: null,
      });
      handleClose();
    } catch (e: any) {
      setAuthState({
        data: null,
        loading: false,
        formLoading: false,
        error: e.response.data.errors.join(", "),
      });
    }
  };

  const signup = async (
    {
      firstName,
      lastName,
      city,
      phone,
      email,
      password,
    }: {
      firstName: string;
      lastName: string;
      city: string;
      phone: string;
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      loading: false,
      formLoading: true,
      error: null,
    });
    try {
      const payload = {
        firstName,
        lastName,
        city,
        phone,
        email,
        password,
      };
      const response = await axiosAuth.post("/signup", payload);
      setAuthState({
        data: response.data,
        loading: false,
        formLoading: false,
        error: null,
      });
      handleClose();
    } catch (e: any) {
      setAuthState({
        data: null,
        loading: false,
        formLoading: false,
        error: e.response.data.errors.join(", "),
      });
    }
  };

  const signout = () => {
    deleteCookie("jwt");

    setAuthState({
      data: null,
      loading: false,
      formLoading: false,
      error: null,
    });
  };

  return {
    signin,
    signup,
    signout,
  };
};

export default useAuth;
