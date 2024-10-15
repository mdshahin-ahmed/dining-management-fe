import { Route, Routes } from "react-router-dom";
import Home from "../../components/Home/Home";
import AppLayout from "../../layouts/AppLayout";
import Profile from "../../components/Profile/Profile";

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
        path="/profile"
        element={
          <AppLayout>
            <Profile />
          </AppLayout>
        }
      />
      {/* <Route path="*" element={<Navigate to="/signin" />} /> */}
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
