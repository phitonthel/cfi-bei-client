import FeedbackForms from "../views/Ts/FeedbackForms/FeedbackForms.js";
import IndividualReport from "../views/Ts/FeedbackReport/IndividualReport.js";
import NominatePeers from "../views/Ts/NominatePeers/index.js";
import NominateSubordinates from "../views/Ts/NominateSubordinates/index.js";

import { ACCESS_LEVEL, APP_SETTINGS } from './const.js'

export const tsRoutes = {
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
        ACCESS_LEVEL.KEPALA_UNIT,
        ACCESS_LEVEL.KEPALA_KANTOR,
        ACCESS_LEVEL.KEPALA_DIVISI,
      ],
      hidden: false,
      visibilityByAppSetting: APP_SETTINGS["Individual Report for 360"],
    },
  ]
}