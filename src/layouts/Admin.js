import React, { useState, Component } from "react";

import _ from "lodash";
import { useSelector } from 'react-redux';
import { useLocation, Route, Switch, Redirect, useHistory } from "react-router-dom";
import Login from "views/Login";

import { fetchAppSettings } from "../apis/applicationSetting/fetchAppSettings";
import { setupAutoLogoutOnTabClose, setupAdvancedAutoLogout, isAuthenticated, requireAuth } from "../apis/user/auth";
import sidebarImage from '../assets/img/sidebar-7.jpg';
import FixedPlugin from "../components/FixedPlugin/FixedPlugin.js";
import Footer from '../components/Footer/Footer';
import AdminNavbar from "../components/Navbars/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { guestRoutes, baseRoutes, APP_SETTINGS } from '../routes/routes.js'
import { fireSwalError } from "../apis/fireSwal";

export const flattenRoutes = (routes) => {
  return routes.flatMap(route => {
    if (!route.children) {
      return route;
    }
    return [
      { ...route },
      ...route.children
    ];
  });
};

const hideRoutesByAppSettings = ({
  routes,
  appSettings,
}) => {
  const filteredRoutes = routes.filter(route => {
    // Filter parent routes
    if (route.visibilityByAppSetting) {
      const setting = appSettings.find(s => s.name === route.visibilityByAppSetting);
      if (setting && !setting.isEnabled) {
        return false;
      }
    }

    // Filter child routes
    if (route.children) {
      route.children = route.children.filter(child => {
        if (child.visibilityByAppSetting) {
          const childSetting = appSettings.find(s => s.name === child.visibilityByAppSetting);
          if (childSetting && !childSetting.isEnabled) {
            return false;
          }
        }
        return true;
      });
    }

    return true;
  });

  return filteredRoutes;
}

const hideRoutesByAccessLevel = ({
  routes,
  authUser,
}) => {
  // if guest, do not filter
  if (!authUser.level) {
    return routes
  }

  const filteredRoutes = routes.filter(route => {
    // Filter parent routes
    if (!route.access.includes(authUser.level)) {
      return false
    }

    // Filter child routes
    if (route.children) {
      route.children = route.children.filter(child => {
        if (!child.access.includes(authUser.level)) {
          return false;
        }
        return true;
      });
    }

    return true;
  });

  return filteredRoutes;
}

const getRoutes = (routes, level) => {
  const flatRoutes = flattenRoutes(routes)

  return flatRoutes.map((prop, key) => {
    // condition for rendering access level goes here
    // this is only for routes, not for Sidebar
    const isLayoutValid = prop.layout === "/hr"
    if (
      isLayoutValid
    ) {
      const path = prop.layout + prop.path
      return (
        <Route
          exact
          path={path}
          render={(props) => <prop.component {...props} />}
          key={key}
        />
      );
    } else {
      return null;
    }
  });
};

function Admin() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const [appSettings, setAppSettings] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  // need to clone to avoid mutating base routes
  // without cloning, it introduces bug when login to diff user
  const clonedBaseRoutes = _.cloneDeep(baseRoutes);

  const authUser = useSelector(state => state.auth.user);
  const history = useHistory();

  const location = useLocation();
  const mainPanel = React.useRef(null);

  // Check if user has access token - if not, show guest routes (login, forgot password, etc.)
  const userIsAuthenticated = isAuthenticated();

  // Check for access token and redirect to login if not present
  React.useEffect(() => {
    // Use the requireAuth function to handle authentication check and redirect
    requireAuth(location.pathname);
  }, [location.pathname]);

  const routesByAppSettings = hideRoutesByAppSettings({
    routes: clonedBaseRoutes,
    appSettings,
  })

  const filteredRoutes = hideRoutesByAccessLevel({
    routes: routesByAppSettings,
    authUser,
  })

  React.useEffect(async () => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }

    try {
      const { data } = await fetchAppSettings()
      setAppSettings(data)
    } catch (error) {
      fireSwalError(error)
    } finally {
      setIsLoading(false)
    }
  }, [location]);

  // Initialize auto-logout on tab close functionality
  React.useEffect(() => {
    // Only setup auto-logout if user is authenticated
    if (userIsAuthenticated && authUser && authUser.access_token) {
      // Option 1: Simple auto-logout on tab close
      // const cleanup = setupAutoLogoutOnTabClose();

      // Option 2: Advanced auto-logout with more control
      const cleanup = setupAdvancedAutoLogout({
        logoutOnTabClose: true,     // Logout when tab/browser is closed
        logoutOnRefresh: false,     // Don't logout on page refresh
        logoutOnTabSwitch: false,   // Don't logout when switching tabs
        excludePaths: ['/hr/login', '/hr/forgot-password', '/hr/reset-password'] // Paths to exclude
      });

      // Cleanup function to remove event listeners when component unmounts
      return cleanup;
    }
  }, [userIsAuthenticated, authUser]); // Re-run when auth status changes

  if (isLoading) {
    return (
      <>
        <div className="wrapper">
          <Sidebar color={color} image={hasImage ? image : ""} routes={[]} />
          <div className="main-panel" ref={mainPanel}>
            <AdminNavbar />
            <div className="content">
              <Switch>{getRoutes(guestRoutes)}</Switch>
            </div>
            <Footer />
          </div>
        </div>
      </>
    )
  }

  if (!userIsAuthenticated) {
    return (
      <>
        <div className="wrapper">
          <Sidebar color={color} image={hasImage ? image : ""} routes={guestRoutes} />
          <div className="main-panel" ref={mainPanel}>
            <AdminNavbar />
            <div className="content">
              <Switch>{getRoutes(guestRoutes)}</Switch>
            </div>
            <Footer />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="wrapper" style={{}}>
        <Sidebar color={color} image={hasImage ? image : ""} routes={filteredRoutes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>{getRoutes(filteredRoutes)}</Switch>
          </div>
          <Footer />
        </div>
      </div>

      {/* <FixedPlugin
        hasImage={hasImage}
        setHasImage={() => setHasImage(!hasImage)}
        color={color}
        setColor={(color) => setColor(color)}
        image={image}
        setImage={(image) => setImage(image)}
      /> */}

    </>
  );
}

export default Admin;
