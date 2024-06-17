import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
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

const queryClient = new QueryClient();
ReactDOM.render(
  <BrowserRouter>
    {/* <GoogleOAuthProvider clientId="805926266475-sf1hpcf8kc2jbpdqcb934tribupg7nug.apps.googleusercontent.com"> */}
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Redirect from="/" to="/admin/home" />
        </Switch>
      </QueryClientProvider>
    </Provider>
    {/* </GoogleOAuthProvider> */}

  </BrowserRouter>,
  document.getElementById("root")
);
