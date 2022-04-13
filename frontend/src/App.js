import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import WebFont from "webfontloader";
import React from "react";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products";
import Search from "./component/Product/SearchPage";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Header />
      <main>
        {isAuthenticated && <UserOptions user={user} />}
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/login" component={LoginSignUp} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/products/:keyword" component={Products} />
        <Route exact path="/cart" component={Cart} />

        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      </main>

      <Footer />
    </Router>
  );
}

export default App;
