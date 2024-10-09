import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

function AuthProvider(props) {
  // const user = useMemo(() => {
  //   return "shahn";
  // }, []);
  const [user, setUser] = useState("");
  console.log(user);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <AuthContext.Provider value={value} {...props}>
      {props?.children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
