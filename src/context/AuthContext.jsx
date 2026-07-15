import { createContext, useEffect, useState } from "react";
import useApi from "./ApiContext";

const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }) {
  const api = useApi();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
      setLoading(true);

    try {
      const response = await fetch(`${api}me/`, {
        credentials: "include",
      });

      console.log("Status:", response.status);

      if (!response.ok) {
        throw new Error("Not authenticated");
      }

      const user = await response.json();

      setUser(user);
      return true;
    } catch {
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
      setLoading(true);

    const response = await fetch(`${api}token/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }
      setLoading(false);

    return checkAuth();
  };

  const createAccount = async (formData) => {
    const response = await fetch(`${api}create-account/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      throw new Error(error?.message || "Account creation failed");
    }

    // If registration also logs the user in
    return checkAuth();

    // Otherwise:
    // await login(formData.email, formData.password1);
  };

  const logout = async () => {
    await fetch(`${api}logout/`, {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        checkAuth,
        createAccount,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
