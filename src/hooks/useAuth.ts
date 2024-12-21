import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");

    if (!token) {
      setError("Missing access token");
      setLoading(false);
      return;
    }

    fetch(
      `${import.meta.env.VITE_API_BASE_URL}${
        import.meta.env.VITE_VALIDATE_PATH
      }${token}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid or expired token");
        }
        return response.json();
      })
      .then(() => {
        setIsAuthenticated(true);
        setError(null);
      })
      .catch((err: any) => {
        // FIXME: provide better type for errors
        console.error("err:", err);
        setIsAuthenticated(false);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { isAuthenticated, loading, error };
};

export default useAuth;
