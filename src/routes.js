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
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import Login from "views/Login";

import Subordinates from "views/Subordinates";
import SelfAssessment from "views/SelfAssessment";
import PeerAssessment from "views/PeerAssessment";
import PeerAssessmentTable from "views/PeerAssessmentTable";
import Reports from "views/Reports";

import Article from "views/article";

export const guestRoutes = [
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-bell-55",
    component: Login,
    layout: "/admin",
  }
]

export const baseRoutes = [
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Check Our Tokopedia!",
  //   icon: "nc-icon nc-alien-33",
  //   component: Upgrade,
  //   layout: "/admin",
  // },
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "nc-icon nc-chart-pie-35",
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  // {
  //   path: "/article",
  //   name: "Article",
  //   icon: "nc-icon nc-notes",
  //   component: Article,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // }
  {
    path: "/subordinates",
    name: "Subordinates",
    icon: "nc-icon nc-chart-pie-35",
    component: Subordinates,
    layout: "/admin",
  },
  {
    path: "/self-assessment",
    name: "Self Assessment",
    icon: "nc-icon nc-paper-2",
    component: SelfAssessment,
    layout: "/admin",
  },
  {
    path: "/peer-assessment",
    name: "Peer Assessment",
    icon: "nc-icon nc-paper-2",
    component: PeerAssessment,
    layout: "/admin",
  },
  {
    path: "/peer-assessment-table",
    name: "Peer Assessment Table",
    icon: "nc-icon nc-paper-2",
    component: PeerAssessmentTable,
    layout: "/admin",
  },
  {
    path: "/reports",
    name: "Reports",
    icon: "nc-icon nc-notes",
    component: Reports,
    layout: "/admin",
  },
];
