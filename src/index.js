/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { store } from "redux/store";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "./layouts/Admin";

ReactDOM.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="805926266475-sf1hpcf8kc2jbpdqcb934tribupg7nug.apps.googleusercontent.com">
      <Provider store={store}>
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Redirect from="/" to="/admin/home" />
        </Switch>
      </Provider>
    </GoogleOAuthProvider>

  </BrowserRouter>,
  document.getElementById("root")
);
