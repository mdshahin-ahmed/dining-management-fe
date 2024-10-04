import "./App.css";
import { useAuth } from "./context/app/useAuth";

function App() {
  const { user } = useAuth();
  console.log(user);

  return <div>Test</div>;
}

export default App;
