import React, { useRef } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavigationBar } from "./components/NavigationBar";
import HomeScreen from "./pages/HomeScreen";
import ProductScreen from "./pages/ProductScreen";
import CartScreen from "./pages/CartScreen";
import SigninScreen from "./pages/SigninScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ProductsScreen from "./pages/ProductsScreen";
import ShippingScreen from "./pages/ShippingScreen";
import PaymentScreen from "./pages/PaymentScreen";
import ConfirmOrderScreen from "./pages/ConfirmOrderScreen";
import OrdersScreen from "./pages/OrdersScreen";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const contextRef = useRef()

  const ProtectedRoute = ({
    component: Component,
    allowedRoles,
    userInfo,
    ...rest
  }) => {

    const userRole = userInfo?.isAdmin === "true" ? "admin" : "user";

    return (
      <Route
        {...rest}
        render={(props) =>
          userRole ? (
            allowedRoles.some((role) => role === userRole) ? (
              <Component {...props} />
            ) : null
          ) : (
              <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
        }
      />
    );
  };

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div ref={contextRef}>
        <NavigationBar contextRef={contextRef} userInfo={userInfo} />
        <main className="main-content" >
          <Switch>
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/confirmorder" component={ConfirmOrderScreen} />
            <Route path="/orders/:id?" component={OrdersScreen} />
            <ProtectedRoute
              path="/products"
              userInfo={userInfo}
              allowedRoles={["admin"]}
              component={ProductsScreen}
            />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
