import { ACCESS_LEVEL } from "./levels";

const {
  STAF,
  EXPERT,
  SPESIALIS,
  ADVISOR,
  SEKRETARIS,
  TRAINER_KANTOR_PERWAKILAN,
  STAF_ADMINISTRASI_KANTOR_PERWAKILAN,
  KEPALA_INKUBATOR,
  KEPALA_KANTOR,
  KEPALA_UNIT,
  KEPALA_DIVISI,
  DIREKTUR,
  SUPERADMIN
} = ACCESS_LEVEL;

export const determineDirectSupervisorLevel = (level) => {
  if ([
    TRAINER_KANTOR_PERWAKILAN,
    STAF_ADMINISTRASI_KANTOR_PERWAKILAN
  ].includes(level)) {
    return KEPALA_KANTOR;
  }

  if ([
    STAF,
    KEPALA_KANTOR,
    KEPALA_INKUBATOR,
    SPESIALIS
  ].includes(level)) {
    return KEPALA_UNIT;
  }

  if ([
    EXPERT,
    KEPALA_UNIT,
    SEKRETARIS
  ].includes(level)) {
    return KEPALA_DIVISI;
  }

  if ([
    ADVISOR,
    KEPALA_DIVISI
  ].includes(level)) {
    return DIREKTUR;
  }

  return SUPERADMIN;
};