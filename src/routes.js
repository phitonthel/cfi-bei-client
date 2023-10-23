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

import Announcement from "./views/Announcement";
import Subordinates from "./views/Subordinates";
import SelfAssessment from "./views/SelfAssessment";
import Reports from "./views/Reports";
import Technical from "./views/Technical";
import Behavioural from "./views/Behavioural";
import FeedbackForms from "./views/FeedbackForms/FeedbackForms.js";
import IndividualReport from "./views/FeedbackReport/IndividualReport.js";
import NominatePeers from "./views/NominatePeers";
import ReviewNominations from "./views/ReviewNominations/index.js";

import PeerAssessmentTable from "./views/PeerAssessmentTable";
import FeedbackForm from "./views/FeedbackForms/FeedbackForm.js";

import Article from "./views/article";
import UserManagement from "./views/UserManagement/UserManagement.js";
import ApplicationSettings from "./views/ApplicationSettings/ApplicationSettings.js";

const ACCESS_LEVEL = {
  STAF: 'Staf',
  KEPALA_UNIT: 'Kepala Unit',
  KEPALA_KANTOR: 'Kepala Kantor',
  KEPALA_DIVISI: 'Kepala Divisi',
  SUPERADMIN: 'SUPERADMIN'
}

export const APP_SETTINGS = {
  "Tab for 360": "Tab for 360",
  "Nominate 360 Peers": "Nominate 360 Peers",
  "Give Feedback for 360": "Give Feedback for 360",
  "Individual Report for 360": "Individual Report for 360",
  "Tab for CFI": "Tab for CFI",
  "Subordinates for CFI": "Subordinates for CFI",
  "Behavioural Assessment for CFI": "Behavioural Assessment for CFI",
  "Technical Assessment for CFI": "Technical Assessment for CFI",
  "Announcement": "Announcement"
}

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
    path: "/review-nominations",
    name: "Review Nominations",
    icon: "nc-icon nc-fav-remove",
    component: ReviewNominations,
    layout: "/admin",
    access: [
      ACCESS_LEVEL.SUPERADMIN,
    ],
    hidden: false,
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
    hidden: false,
  },
  {
    path: "/360",
    name: "360 Feedback",
    icon: "nc-icon nc-bullet-list-67",
    layout: "/admin",
    access: [
      ACCESS_LEVEL.STAF,
      ACCESS_LEVEL.KEPALA_UNIT,
      ACCESS_LEVEL.KEPALA_KANTOR,
      ACCESS_LEVEL.KEPALA_DIVISI,
    ],
    hidden: false,
    visibilityByAppSetting: APP_SETTINGS["Tab for 360"],
    children: [
      {
        path: "/nominate-peers",
        name: "Nominate Peers",
        icon: "nc-icon nc-favourite-28",
        component: NominatePeers,
        layout: "/admin",
        access: [
          ACCESS_LEVEL.KEPALA_UNIT,
          ACCESS_LEVEL.KEPALA_KANTOR,
          ACCESS_LEVEL.KEPALA_DIVISI,
        ],
        hidden: false,
        visibilityByAppSetting: APP_SETTINGS["Nominate 360 Peers"],
      },
      {
        path: "/feedback-forms",
        name: "Feedback Forms",
        icon: "nc-icon nc-ruler-pencil",
        component: FeedbackForms,
        layout: "/admin",
        access: [
          ACCESS_LEVEL.STAF,
          ACCESS_LEVEL.KEPALA_UNIT,
          ACCESS_LEVEL.KEPALA_KANTOR,
          ACCESS_LEVEL.KEPALA_DIVISI,
        ],
        hidden: false,
        visibilityByAppSetting: APP_SETTINGS["Give Feedback for 360"],
      },
      {
        path: "/individual-report",
        name: "Individual Report",
        icon: "nc-icon nc-chart-bar-32",
        component: IndividualReport,
        layout: "/admin",
        access: [
          ACCESS_LEVEL.STAF,
          ACCESS_LEVEL.KEPALA_UNIT,
          ACCESS_LEVEL.KEPALA_KANTOR,
          ACCESS_LEVEL.KEPALA_DIVISI,
        ],
        hidden: false,
        visibilityByAppSetting: APP_SETTINGS["Individual Report for 360"],
      },
    ]
  },
  {
    path: "/cfi",
    name: "C. Fit Index",
    icon: "nc-icon nc-bullet-list-67",
    layout: "/admin",
    access: [
      ACCESS_LEVEL.STAF,
      ACCESS_LEVEL.KEPALA_UNIT,
      ACCESS_LEVEL.KEPALA_KANTOR,
      ACCESS_LEVEL.KEPALA_DIVISI,
    ],
    hidden: false,
    visibilityByAppSetting: APP_SETTINGS["Tab for CFI"],
    children: [
      {
        path: "/subordinates",
        name: "Subordinates",
        icon: "nc-icon nc-chart-pie-35",
        component: Subordinates,
        layout: "/admin",
        access: Object.values(ACCESS_LEVEL),
        hidden: false,
        visibilityByAppSetting: APP_SETTINGS["Subordinates for CFI"]
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
        hidden: false,
        visibilityByAppSetting: APP_SETTINGS["Behavioural Assessment for CFI"],
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
        hidden: false,
        visibilityByAppSetting: APP_SETTINGS["Technical Assessment for CFI"],
      },
    ]
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
    hidden: true,
  },
  {
    path: "/feedback-form",
    name: "Feedback Form",
    icon: "nc-icon nc-paper-2",
    component: FeedbackForm,
    layout: "/admin",
    access: [
      ACCESS_LEVEL.STAF,
      ACCESS_LEVEL.KEPALA_UNIT,
      ACCESS_LEVEL.KEPALA_KANTOR,
      ACCESS_LEVEL.KEPALA_DIVISI,
      ACCESS_LEVEL.SUPERADMIN,
    ],
    hidden: true,
  },
];
