import Dashboard from "../views/Dashboard.js";
import UserProfile from "../views/UserProfile.js";
import Typography from "../views/Typography.js";
import Icons from "../views/Icons.js";
import Maps from "../views/Maps.js";
import Notifications from "../views/Notifications.js";
import Upgrade from "../views/Upgrade.js";
import Login from "../views/Login/index.js";
import LandingPage from "../views/LandingPage/LandingPage.js";

import Announcement from "../views/Announcement/index.js";
import Reports from "../views/Reports/index.js";
import ReviewNominations from "../views/Ts/ReviewNominations/index.js";

import Article from "../views/article/index.js";
import UserManagement from "../views/UserManagement/UserManagement.js";
import ApplicationSettings from "../views/ApplicationSettings/ApplicationSettings.js";
import { tsRoutes } from "./tsRoutes.js";
import { cfiRoutes } from "./cfiRoutes.js";

// new
import AssessmentSelection from "../views/Cfi/AssessmentSelection/AssessmentSelection.js";
import CfiManagement from "../views/Cfi/CfiManagement/CfiManagement.js";
import CfiTypeSelection from "../views/Cfi/CfiTypeSelection/CfiTypeSelection";
import AssigneeManagement from "../views/Cfi/AssigneeManagement/AssigneeManagement.js";

import { ACCESS_LEVEL, APP_SETTINGS } from './const.js'

export const guestRoutes = [
  {
    path: "/home",
    name: "Landing Page",
    icon: "nc-icon nc-bell-55",
    component: LandingPage,
    layout: "/admin",
    access: null,
    hidden: true,
  },
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-bell-55",
    component: Login,
    layout: "/admin",
    access: null,
    hidden: true,
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
  //   access: Object.values(ACCESS_LEVEL),
  //   hidden: false,
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
  //   access: Object.values(ACCESS_LEVEL),
  //   hidden: false,
  // },
  {
    path: "/announcement",
    name: "Announcement",
    icon: "nc-icon nc-bell-55",
    component: Announcement,
    layout: "/admin",
    access: Object.values(ACCESS_LEVEL),
    hidden: false,
    visibilityByAppSetting: APP_SETTINGS.Announcement
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserProfile,
    layout: "/admin",
    access: Object.values(ACCESS_LEVEL),
    hidden: false,
  },
  {
    path: "/user-management",
    name: "User Management",
    icon: "nc-icon nc-circle-09",
    component: UserManagement,
    layout: "/admin",
    access: [
      ACCESS_LEVEL.SUPERADMIN,
    ],
    hidden: false,
  },
  {
    path: "/application-settings",
    name: "Application Settings",
    icon: "nc-icon nc-settings-gear-64",
    component: ApplicationSettings,
    layout: "/admin",
    access: [
      ACCESS_LEVEL.SUPERADMIN,
    ],
    hidden: false,
  },
  {
    path: "/cfi-route-selections",
    name: "CFI Route Selection",
    icon: "nc-icon nc-settings-gear-64",
    component: CfiTypeSelection,
    layout: "/admin",
    access: Object.values(ACCESS_LEVEL),
    hidden: true,
  },
  {
    path: "/cfi-assignee-management",
    name: "Assignee Management",
    icon: "nc-icon nc-settings-gear-64",
    component: AssigneeManagement,
    layout: "/admin",
    access: Object.values(ACCESS_LEVEL),
    hidden: true,
  },
  {
    path: "/cfi-management",
    name: "CFI Management",
    icon: "nc-icon nc-settings-gear-64",
    component: CfiManagement,
    layout: "/admin",
    access: Object.values(ACCESS_LEVEL),
    hidden: false,
  },
  {
    path: "/cfi-assessment-selections",
    name: "CFI Selection",
    icon: "nc-icon nc-paper-2",
    component: AssessmentSelection,
    layout: "/admin",
    access: Object.values(ACCESS_LEVEL),
    hidden: false,
  },
  tsRoutes,
  ...cfiRoutes,
];
