import React from "react";
import "./App.css";
import { useAuth } from "./context/app/useAuth";
import AuthenticatedApp from "./navigation/authenticated-app";
import UnAuthenticatedApp from "./navigation/unauthenticated-app";
import { Loader } from "semantic-ui-react";

function App() {
  const { user } = useAuth();
  console.log(user);
  console.log("App");

  return (
    <React.Suspense fallback={<Loader>Loading...</Loader>}>
      {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </React.Suspense>
  );
}

export default App;
