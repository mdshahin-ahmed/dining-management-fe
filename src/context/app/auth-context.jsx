import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useMemo, useState } from "react";
import FullPageLoader from "../../components/common/FullPageLoader";
import { useClient } from "../../hooks/pure/useClient";
import { getToken } from "../../utils/auth/auth-utils";

export const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

function AuthProvider(props) {
  const [user, setUser] = useState("");
  const token = getToken();
  console.log(user);
  const client = useClient();
  const { data, isFetching: isMeApiFetching } = useQuery({
    queryKey: ["me"],
    queryFn: () => client(`user/me`), // Fetch function
    enabled: Boolean(token), // Run the query only if the token is available
  });

  useEffect(() => {
    setUser(data);
  }, [data, token]);

  const value = useMemo(
    () => ({ user, setUser, isMeApiFetching }),
    [user, setUser, isMeApiFetching]
  );

  return (
    <AuthContext.Provider value={value} {...props}>
      <>{isMeApiFetching ? <FullPageLoader /> : props?.children}</>
    </AuthContext.Provider>
  );
}

export { AuthProvider };
