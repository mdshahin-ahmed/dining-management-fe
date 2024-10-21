import { Route, Routes } from "react-router-dom";
import Home from "../../components/Home/Home";
import AppLayout from "../../layouts/AppLayout";
import Profile from "../../components/Profile/Profile";
import MealListPage from "../../components/Meal/MealListPage";
import MealDetails from "../../components/Meal/MealDetails";
import UserMeal from "../../components/Meal/User/UserMeal";
import Breakfast from "../../components/Meal/User/Breakfast";
import Lunch from "../../components/Meal/User/Lunch";
import Dinner from "../../components/Meal/User/Dinner";

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
        path="/manage-meal"
        element={
          <AppLayout>
            <MealListPage />
          </AppLayout>
        }
      />
      <Route
        path="/meals"
        element={
          <AppLayout>
            <UserMeal />
          </AppLayout>
        }
      />
      <Route
        path="/meals/breakfast"
        element={
          <AppLayout>
            <Breakfast />
          </AppLayout>
        }
      />
      <Route
        path="/meals/lunch"
        element={
          <AppLayout>
            <Lunch />
          </AppLayout>
        }
      />
      <Route
        path="/meals/dinner"
        element={
          <AppLayout>
            <Dinner />
          </AppLayout>
        }
      />
      <Route
        path="/manage-meal/add"
        element={
          <AppLayout>
            <MealDetails />
          </AppLayout>
        }
      />
      <Route
        path="/manage-meal/:id/edit"
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
