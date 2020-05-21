import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";
import HomeScreen from "./pages/HomeScreen";
import ProductScreen from "./pages/ProductScreen";
import CartScreen from "./pages/CartScreen";
import SigninScreen from "./pages/SigninScreen";
import RegisterScreen from "./pages/RegisterScreen";

import { useSelector } from "react-redux";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <NavigationBar>
        <main className="main-content">
          <Switch>
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
          </Switch>
        </main>
      </NavigationBar>
    </BrowserRouter>
  );
}

export default App;
