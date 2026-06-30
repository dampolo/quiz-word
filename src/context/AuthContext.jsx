import { createContext, useEffect, useState } from "react";
import useApi from "./ApiContext";

const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }) {
  const api = useApi()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${api}me/`, {
        credentials: "include",
      });

      console.log("Status:", response.status)

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

    return checkAuth();
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
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
