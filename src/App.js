import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/user/user.action";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import RequireAuth from "./routes/require-auth/require-auth.component";
import Spinner from "./components/spinner/spinner.component";

const Shop = lazy(() => import("./routes/shop/shop.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));
const Authentication = lazy(() =>
  import("./routes/authentication/authentication.component")
);
const Orders = lazy(() => import("./routes/orders/orders.component"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route
          path="shop/*"
          element={
            <Suspense fallback={<Spinner />}>
              <Shop />
            </Suspense>
          }
        />
        <Route
          path="auth"
          element={
            <Suspense fallback={<Spinner />}>
              <Authentication />
            </Suspense>
          }
        />
        <Route
          path="checkout"
          element={
            <RequireAuth>
              <Suspense fallback={<Spinner />}>
                <Checkout />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="orders"
          element={
            <RequireAuth>
              <Suspense fallback={<Spinner />}>
                <Orders />
              </Suspense>
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
