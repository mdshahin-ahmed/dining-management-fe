import "./App.css";
import { useAuth } from "./context/app/useAuth";
import AuthenticatedApp from "./navigation/authenticated-app";
import UnAuthenticatedApp from "./navigation/unauthenticated-app";

function App() {
  const { user } = useAuth();
  console.log(user);

  return <>{user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}</>;
}

export default App;
