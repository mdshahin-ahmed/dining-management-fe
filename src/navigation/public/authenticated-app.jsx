import { Route, Routes } from "react-router-dom";
import Home from "../../components/Home/Home";
import MealDetails from "../../components/Meal/MealDetails";
import MealListPage from "../../components/Meal/MealListPage";
import UserMeal from "../../components/Meal/User/UserMeal";
import OrderList from "../../components/Order/OrderList";
import Profile from "../../components/Profile/Profile";
import ManageUser from "../../components/Users/ManageUser";
import UsersList from "../../components/Users/UsersList";
import AppLayout from "../../layouts/AppLayout";
import AuthorizedRoute from "../AuthorizedRoute";
import AllOrders from "../../components/Order/AllOrders";
import StateMentList from "../../components/Statements/StateMentList";
import BalanceList from "../../components/Statements/BalanceList";

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
          <AuthorizedRoute permissions={["admin"]}>
            <AppLayout>
              <MealListPage />
            </AppLayout>
          </AuthorizedRoute>
        }
      />
      <Route
        path="/meals"
        element={
          <AuthorizedRoute permissions={["admin", "user"]}>
            <AppLayout>
              <UserMeal />
            </AppLayout>
          </AuthorizedRoute>
        }
      />
      <Route
        path="/manage-meal/add"
        element={
          <AuthorizedRoute permissions={["admin"]}>
            <AppLayout>
              <MealDetails />
            </AppLayout>
          </AuthorizedRoute>
        }
      />
      <Route
        path="/manage-meal/:id/edit"
        element={
          <AuthorizedRoute permissions={["admin"]}>
            <AppLayout>
              <MealDetails />
            </AppLayout>
          </AuthorizedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <AuthorizedRoute permissions={["admin"]}>
            <AppLayout>
              <UsersList />
            </AppLayout>
          </AuthorizedRoute>
        }
      />
      <Route
        path="/users/add"
        element={
          <AuthorizedRoute permissions={["admin"]}>
            <AppLayout>
              <ManageUser />
            </AppLayout>
          </AuthorizedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <AuthorizedRoute permissions={["admin", "user", "manager"]}>
            <AppLayout>
              <OrderList />
            </AppLayout>
          </AuthorizedRoute>
        }
      />
      <Route
        path="/all-order"
        element={
          <AuthorizedRoute permissions={["admin", "manager"]}>
            <AppLayout>
              <AllOrders />
            </AppLayout>
          </AuthorizedRoute>
        }
      />
      <Route
        path="/balances"
        element={
          <AuthorizedRoute permissions={["admin", "user"]}>
            <AppLayout>
              <BalanceList />
            </AppLayout>
          </AuthorizedRoute>
        }
      />
      <Route
        path="/statements"
        element={
          <AuthorizedRoute permissions={["admin", "user"]}>
            <AppLayout>
              <StateMentList />
            </AppLayout>
          </AuthorizedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthorizedRoute permissions={["admin", "user", "manager"]}>
            <AppLayout>
              <Profile />
            </AppLayout>
          </AuthorizedRoute>
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
