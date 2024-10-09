import { Route, Routes } from "react-router-dom";
import Home from "../../components/Home/Home";
import AppLayout from "../../layouts/AppLayout";

function AuthenticatedApp() {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <AppLayout>
            <Home />
          </AppLayout>
        }
      />
      <Route
        path="*"
        element={
          <AppLayout>
            <Home />
          </AppLayout>
        }
      />
    </Routes>
  );
}

export default AuthenticatedApp;
