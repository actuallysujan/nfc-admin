"use client";

import { useState } from "react";
import { authService } from "@/features/services/authService";

export function useLogin() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setStatus("loading");
    setError(null);

    try {
      const data = await authService.login(email, password);

      if (!data.token) {
        throw new Error("Login response has no token");
      }

      localStorage.setItem("token", data.token);

      setStatus("success");
      return true;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Login failed";

      setError(message);
      setStatus("failure");

      return false;
    }
  };

  return {
    login,
    status,
    error,
    isLoading: status === "loading",
  };
}