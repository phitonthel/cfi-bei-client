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
import Dashboard from "./views/Dashboard.js";
import UserProfile from "./views/UserProfile.js";
import Typography from "./views/Typography.js";
import Icons from "./views/Icons.js";
import Maps from "./views/Maps.js";
import Notifications from "./views/Notifications.js";
import Upgrade from "./views/Upgrade.js";
import Login from "./views/Login";
import LandingPage from "./views/LandingPage/LandingPage.js";

import Subordinates from "./views/Subordinates";
import SelfAssessment from "./views/SelfAssessment";
import PeerAssessmentTable from "./views/PeerAssessmentTable";
import Reports from "./views/Reports";
import Technical from "./views/Technical";
import Behavioural from "./views/Behavioural";

import Article from "./views/article";

const ACCESS_LEVEL = {
  STAF: 'Staf',
  KEPALA_UNIT: 'Kepala Unit',
  KEPALA_KANTOR: 'Kepala Kantor',
  KEPALA_DIVISI: 'Kepala Divisi',
  SUPERADMIN: 'SUPERADMIN'
}

export const guestRoutes = [
  {
    path: "/home",
    name: "Landing Page",
    icon: "nc-icon nc-bell-55",
    component: LandingPage,
    layout: "/admin",
    access: null
  },
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-bell-55",
    component: Login,
    layout: "/admin",
    access: null
  },
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
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
    access: Object.values(ACCESS_LEVEL),
  },
  {
    path: "/subordinates",
    name: "Subordinates",
    icon: "nc-icon nc-chart-pie-35",
    component: Subordinates,
    layout: "/admin",
    access: Object.values(ACCESS_LEVEL),
  },
  {
    path: "/self-assessment-behavioural",
    name: "Behavioural Asm.",
    icon: "nc-icon nc-paper-2",
    component: Behavioural,
    layout: "/admin",
    access: [
      ACCESS_LEVEL.STAF,
      ACCESS_LEVEL.KEPALA_UNIT,
      ACCESS_LEVEL.KEPALA_KANTOR,
      ACCESS_LEVEL.KEPALA_DIVISI,
    ],
  },
  {
    path: "/self-assessment-technical",
    name: "Technical Asm.",
    icon: "nc-icon nc-paper-2",
    component: Technical,
    layout: "/admin",
    access: [
      ACCESS_LEVEL.STAF,
      ACCESS_LEVEL.KEPALA_UNIT,
      ACCESS_LEVEL.KEPALA_KANTOR,
      ACCESS_LEVEL.KEPALA_DIVISI,
    ],
  },
  {
    path: "/peer-assessment-table",
    name: "Peer Assessment Table",
    icon: "nc-icon nc-paper-2",
    component: PeerAssessmentTable,
    layout: "/admin",
    access: [
      ACCESS_LEVEL.KEPALA_UNIT,
      ACCESS_LEVEL.KEPALA_KANTOR,
      ACCESS_LEVEL.KEPALA_DIVISI,
      ACCESS_LEVEL.SUPERADMIN,
    ],
  },
  {
    path: "/reports",
    name: "Reports",
    icon: "nc-icon nc-notes",
    component: Reports,
    layout: "/admin",
    access: [
      ACCESS_LEVEL.SUPERADMIN
    ],
  },
];
