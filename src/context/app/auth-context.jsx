import { createContext, useMemo } from "react";

export const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

function AuthProvider(props) {
  const user = useMemo(() => {
    return "";
  }, []);

  const value = useMemo(() => ({ user }), [user]);

  return (
    <AuthContext.Provider value={value} {...props}>
      {props?.children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
