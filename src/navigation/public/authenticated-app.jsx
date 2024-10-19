import { Route, Routes } from "react-router-dom";
import Home from "../../components/Home/Home";
import AppLayout from "../../layouts/AppLayout";
import Profile from "../../components/Profile/Profile";
import MealListPage from "../../components/Meal/MealListPage";
import MealDetails from "../../components/Meal/MealDetails";

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
        path="/meal"
        element={
          <AppLayout>
            <MealListPage />
          </AppLayout>
        }
      />
      <Route
        path="/meal/add"
        element={
          <AppLayout>
            <MealDetails />
          </AppLayout>
        }
      />
      <Route
        path="/meal/:id/edit"
        element={
          <AppLayout>
            <MealDetails />
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
