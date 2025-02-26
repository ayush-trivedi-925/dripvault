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
import { Toaster } from "./components/ui/toaster";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturn from "./Pages/Shopping-View/PayPalReturn";
import PaymentSuccess from "./Pages/Shopping-View/PaymentSuccess";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800px] bg-black h-[800px]" />;

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
          <Route path="paypal-return" element={<PaypalReturn />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
