import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/Auth/AuthLayout";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import AdminLayout from "./components/Admin-View/AdminLayout";
import AdminDashboard from "./Pages/Admin-View/AdminDashboard";
import AdminOrders from "./Pages/Admin-View/AdminOrders";
import AdminProducts from "./Pages/Admin-View/AdminProducts";
import AdminFeatures from "./Pages/Admin-View/AdminFeatures";
import ShoppingLayout from "./components/Shopping-View/ShoppingLayout";
import NotFound from "./Pages/Not-Found/NotFound";
import ShoppingHome from "./Pages/Shopping-View/ShoppingHome";
import ShoppingListing from "./Pages/Shopping-View/ShoppingListing";
import ShoppingCheckout from "./Pages/Shopping-View/ShoppingCheckout";
import ShoppingAccount from "./Pages/Shopping-View/ShoppingAccount";
import CheckAuth from "./components/Common/AuthCheck";
import Unauthorized from "./Pages/Unauthorized/Unauthorized";

function App() {
  const isAuthenticated = false;
  const user = null;

  return (
    <div className="flex flex-col overflow-hidden bg-white ">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
