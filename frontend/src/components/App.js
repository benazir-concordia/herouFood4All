import React, { Component } from "react";
import axios from "axios";
import store from "../store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { loadUser } from "../actions/auth";
import { LOGIN_FAIL } from "../actions/types";

import PrivateRoute from "./Auth/PrivateRoute";
import Alert from "../components/Common/Alerts/Alerts";

import Login from "./Pages/Login/Login";
import CreateUser from "./Pages/CreateUser/CreateUser";
import Profile from "./Pages/Profile/Profile";
import Dashboard from "./Pages/Dashboard/Dashboard"
import RequestedFood from "./Pages/RequestedFood/RequestedFood"
import ReceiverDashboard from "./Pages/Dashboard/ReceiverDashboard,"
import FoodDetails from "./Pages/FoodDetails/FoodDetails"
import Page404 from "./Common/Page404/Page404";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:8000";
}

class App extends Component {
  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      store.dispatch(loadUser());
    } else {
      store.dispatch({ type: LOGIN_FAIL });
    }
  }

  render() {
    let appRoutes;
    appRoutes = (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/create-user" component={CreateUser} />
        <PrivateRoute path="/app/change-password" component={Profile} />
        <PrivateRoute path="/app/food-post" component={FoodDetails} />
        <PrivateRoute path="/app/requested_food" component={RequestedFood} />

        <PrivateRoute path="/app/map" component={ReceiverDashboard} />

        <PrivateRoute exact path="/" component={Dashboard} />
      </Switch>
    );

    return (
      <Router>
        <Alert /> {appRoutes}
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(App);
