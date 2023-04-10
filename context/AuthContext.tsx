"use client";

import React, { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { getCookie } from "cookies-next";
import { axiosAuth } from "../utils/axiosConfig";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
}

interface State {
  loading: boolean;
  error: string | null;
  data: User | null;
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
  loading: true,
  data: null,
  error: null,
  setAuthState: () => {},
});

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState<State>({
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const jwt = getCookie("jwt");

      if (!jwt) {
        return setAuthState({
          data: null,
          error: null,
          loading: false,
        });
      }

      const response = await axiosAuth.get("/me");

      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
    } catch (e: any) {
      setAuthState({
        data: null,
        loading: false,
        error: e.response?.data?.errors?.join(",") ?? e,
      });
    }
  };
  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
