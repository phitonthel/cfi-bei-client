import Subordinates from "../views/Cfi/Subordinates/index.js";
import Technical from "../views/Cfi/Technical/Technical.js";
import Behavioural from "../views/Cfi/Behavioural/index.js";

import { ACCESS_LEVEL, APP_SETTINGS } from './const.js'
import Reports from "../views/Reports/index.js";
import IndividualReport from "../views/Cfi/IndividualReports/IndividualReport.js";
import IndividualReports from "../views/Cfi/IndividualReports/IndividualReports.js";
import GraphReport from "../views/Cfi/GraphReports/GraphReport.js";

export const cfiRoutes = {
  path: "/cfi",
  name: "C. Fit Index",
  icon: "nc-icon nc-bullet-list-67",
  layout: "/admin",
  access: [
    ACCESS_LEVEL.STAF,
    ACCESS_LEVEL.KEPALA_UNIT,
    ACCESS_LEVEL.KEPALA_KANTOR,
    ACCESS_LEVEL.KEPALA_DIVISI,
    ACCESS_LEVEL.SUPERADMIN,
  ],
  hidden: false,
  visibilityByAppSetting: APP_SETTINGS["CFI"],
  children: [
    {
      path: "/cfi/subordinates",
      name: "Subordinates",
      icon: "nc-icon nc-chart-pie-35",
      component: Subordinates,
      layout: "/admin",
      access: Object.values(ACCESS_LEVEL),
      hidden: false,
      visibilityByAppSetting: APP_SETTINGS["CFI - Subordinates"]
    },
    {
      path: "/cfi/self-assessment-behavioural",
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
      visibilityByAppSetting: APP_SETTINGS["CFI - Behavioural"],
    },
    {
      path: "/cfi/self-assessment-technical",
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
      visibilityByAppSetting: APP_SETTINGS["CFI - Technical"],
    },
    {
      path: "/cfi/individual-reports",
      name: "Individual Reports",
      icon: "nc-icon nc-notes",
      component: IndividualReports,
      layout: "/admin",
      access: Object.values(ACCESS_LEVEL)
        .filter(level => level !== ACCESS_LEVEL.SUPERADMIN),
      hidden: false,
    },
    {
      path: "/cfi/reports",
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
      path: "/cfi/graph-report",
      name: "Graph Reports",
      icon: "nc-icon nc-notes",
      component: GraphReport,
      layout: "/admin",
      access: Object.values(ACCESS_LEVEL),
      hidden: false,
    },
  ]
}