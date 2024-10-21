import { Route, Routes } from "react-router-dom";
import Home from "../../components/Home/Home";
import MealDetails from "../../components/Meal/MealDetails";
import MealListPage from "../../components/Meal/MealListPage";
import UserMeal from "../../components/Meal/User/UserMeal";
import Profile from "../../components/Profile/Profile";
import UsersList from "../../components/Users/UsersList";
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
      {/* <Route
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
      /> */}
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
        path="/users"
        element={
          <AppLayout>
            <UsersList />
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
