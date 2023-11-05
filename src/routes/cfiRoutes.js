import Subordinates from "../views/Cfi/Subordinates/index.js";
import Technical from "../views/Cfi/Technical/Technical.js";
import Behavioural from "../views/Cfi/Behavioural/index.js";

import { ACCESS_LEVEL, APP_SETTINGS } from './const.js'

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
}