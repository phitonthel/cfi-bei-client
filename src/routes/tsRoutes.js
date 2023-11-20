import IndividualReports from "../views/Ts/IndividualReport/IndividualReports.js";
import FeedbackForms from "../views/Ts/FeedbackForms/FeedbackForms.js";
import IndividualReport from "../views/Ts/IndividualReport/IndividualReport.js";
import NominatePeers from "../views/Ts/NominatePeers/index.js";
import NominateSubordinates from "../views/Ts/NominateSubordinates/index.js";

import { ACCESS_LEVEL, APP_SETTINGS } from './const.js'
import GroupReport from "../views/Ts/GroupReport/GroupReport.js";
import ReviewNomination from "../views/Ts/ReviewNominations/ReviewNominations.js";

export const tsRoutes = {
  path: "/360",
  name: "360 Feedback",
  icon: "nc-icon nc-bullet-list-67",
  layout: "/admin",
  access: Object.values(ACCESS_LEVEL),
  hidden: false,
  visibilityByAppSetting: APP_SETTINGS["360"],
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
      visibilityByAppSetting: APP_SETTINGS["360 - Nominate Peers"],
    },
    {
      path: "/nominate-subordinates",
      name: "Nominate Subordinates",
      icon: "nc-icon nc-favourite-28",
      component: NominateSubordinates,
      layout: "/admin",
      access: [
        ACCESS_LEVEL.KEPALA_UNIT,
        ACCESS_LEVEL.KEPALA_KANTOR,
        ACCESS_LEVEL.KEPALA_DIVISI,
      ],
      hidden: false,
      visibilityByAppSetting: APP_SETTINGS["360 - Nominate Peers"],
    },
    {
      path: "/review-nominations",
      name: "Review Nominations",
      icon: "nc-icon nc-fav-remove",
      component: ReviewNomination,
      layout: "/admin",
      access: [
        ACCESS_LEVEL.SUPERADMIN,
      ],
      hidden: false,
    },
    {
      path: "/feedback-forms",
      name: "Feedback Forms",
      icon: "nc-icon nc-ruler-pencil",
      component: FeedbackForms,
      layout: "/admin",
      access: Object.values(ACCESS_LEVEL)
        .filter(level => level !== ACCESS_LEVEL.SUPERADMIN),
      hidden: false,
      visibilityByAppSetting: APP_SETTINGS["360 - Feedback Form"],
    },
    {
      path: "/individual-reports",
      name: "Individual Reports",
      icon: "nc-icon nc-chart-bar-32",
      component: IndividualReports,
      layout: "/admin",
      access: [
        ACCESS_LEVEL.KEPALA_UNIT,
        ACCESS_LEVEL.KEPALA_KANTOR,
        ACCESS_LEVEL.KEPALA_DIVISI,
        ACCESS_LEVEL.DIREKTUR,
        ACCESS_LEVEL.SUPERADMIN,
      ],
      hidden: false,
      visibilityByAppSetting: APP_SETTINGS["360 - Individual Report"],
    },
    {
      path: "/group-report",
      name: "Group Report",
      icon: "nc-icon nc-chart-bar-32",
      component: GroupReport,
      layout: "/admin",
      access: [
        ACCESS_LEVEL.KEPALA_UNIT,
        ACCESS_LEVEL.KEPALA_KANTOR,
        ACCESS_LEVEL.KEPALA_DIVISI,
        ACCESS_LEVEL.DIREKTUR,
        ACCESS_LEVEL.SUPERADMIN,
      ],
      hidden: false,
      visibilityByAppSetting: APP_SETTINGS["360 - Group Report"],
    },
  ]
}