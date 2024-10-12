import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useMemo, useState } from "react";
import { useClient } from "../../hooks/pure/useClient";
import { getToken } from "../../utils/auth/auth-utils";
import AsToast from "../../components/common/AsToast";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { removeDoubleQuotes } from "../../utils/helper";

export const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

function AuthProvider(props) {
  const token = getToken();
  const [user, setUser] = useState("");
  console.log(user);
  const client = useClient();
  const { data, isSuccess } = useQuery({
    queryKey: ["me"],
    queryFn: () => client(`user/me`), // Fetch function
    // enabled: Boolean(token), // Run the query only if the token is available
    onSuccess: (data) => {
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>{removeDoubleQuotes("error.message")}</span>
        </div>
      );
    },
    onError: (err) => {
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>{removeDoubleQuotes("error.message")}</span>
        </div>
      );
    },
  });

  // useEffect(() => {
  //   setUser(data);
  // }, [data, token]);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <AuthContext.Provider value={value} {...props}>
      {props?.children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
