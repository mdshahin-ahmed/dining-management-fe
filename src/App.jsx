import React, { useEffect } from "react";
import "./App.css";
import { useAuth } from "./context/app/useAuth";
import { Loader } from "semantic-ui-react";

const AuthenticatedApp = React.lazy(() =>
  import("./navigation/public/authenticated-app")
);
const UnAuthenticatedApp = React.lazy(() =>
  import("./navigation/public/unauthenticated-app")
);

function App() {
  const { user } = useAuth();
  console.log(user);
  useEffect(() => {}, [user]);

  return (
    <React.Suspense fallback={<Loader>Loading...</Loader>}>
      {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </React.Suspense>
  );
}

export default App;
