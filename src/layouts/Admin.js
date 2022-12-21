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
import React, { Component } from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import AdminNavbar from "../components/Navbars/AdminNavbar";
import Footer from '../components/Footer/Footer';
import Sidebar from "../components/Sidebar/Sidebar";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin.js";
import Login from "views/Login";

import { guestRoutes, baseRoutes } from '../routes.js'

import sidebarImage from "assets/img/sidebar-7.jpg";

function Admin() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);

  const location = useLocation();
  const mainPanel = React.useRef(null);

  const access_token = localStorage.getItem("access_token");
  const level = localStorage.getItem("level");

  const getRoutes = (baseRoutes, level) => {
    console.log({baseRoutes})
    return baseRoutes.map((prop, key) => {
      // condition for rendering access level goes here
      // this is only for routes, not for Sidebar
      const isLayoutValid = prop.layout === "/admin"
      const isAccessValid = !level ? true : prop.access.includes(level)
      if (
        isLayoutValid &&
        isAccessValid
      ) {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  React.useEffect(() => {
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
  }, [location]);

  if (!access_token) {
    console.log({guestRoutes}, {level});
    return (
      <>
        <div className="wrapper">
          <Sidebar color={color} image={hasImage ? image : ""} routes={guestRoutes} />
          <div className="main-panel" ref={mainPanel}>
            <AdminNavbar />
            <div className="content">
              <Switch>{getRoutes(guestRoutes, level)}</Switch>
            </div>
            <Footer />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={baseRoutes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>{getRoutes(baseRoutes, level)}</Switch>
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
