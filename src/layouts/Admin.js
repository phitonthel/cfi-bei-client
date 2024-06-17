import _ from "lodash";
import React, { useState, Component } from "react";
import { useSelector } from 'react-redux';
import { useLocation, Route, Switch } from "react-router-dom";

import AdminNavbar from "../components/Navbars/AdminNavbar";
import Footer from '../components/Footer/Footer';
import Sidebar from "../components/Sidebar/Sidebar";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin.js";
import Login from "views/Login";

import { guestRoutes, baseRoutes } from '../routes/routes.js'

import sidebarImage from '../assets/img/sidebar-7.jpg';
import { fetchAppSettings } from "../apis/applicationSetting/fetchAppSettings";

import { APP_SETTINGS } from "../routes/routes.js";

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

function Admin() {
  // console.log('Running in:', process.env.NODE_ENV)
  
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const [appSettings, setAppSettings] = React.useState([])

  // need to clone to avoid mutating base routes
  // without cloning, it introduces bug when login to diff user
  const clonedBaseRoutes = _.cloneDeep(baseRoutes);

  const authUser = useSelector(state => state.auth.user);

  const location = useLocation();
  const mainPanel = React.useRef(null);

  const routesByAppSettings = hideRoutesByAppSettings({
    routes: clonedBaseRoutes,
    appSettings,
  })

  const filteredRoutes = hideRoutesByAccessLevel({
    routes: routesByAppSettings,
    authUser,
  })

  const getRoutes = (routes, level) => {
    const flatRoutes = flattenRoutes(routes)

    return flatRoutes.map((prop, key) => {
      // condition for rendering access level goes here
      // this is only for routes, not for Sidebar
      const isLayoutValid = prop.layout === "/admin"
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

    const { data } = await fetchAppSettings()
    setAppSettings(data)
  }, [location]);

  if (!localStorage.getItem('access_token')) {
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
