export const ACCESS_LEVEL = {
  STAF: "Staf",
  EXPERT: "Expert",
  SPESIALIS: "Spesialis",
  ADVISOR: "Advisor",
  SEKRETARIS: "Sekretaris",
  TRAINER_KANTOR_PERWAKILAN: "Trainer Kantor Perwakilan",
  STAF_ADMINISTRASI_KANTOR_PERWAKILAN: "Staf Administrasi Kantor Perwakilan",
  KEPALA_INKUBATOR: "Kepala Inkubator",
  KEPALA_KANTOR: "Kepala Kantor",
  KEPALA_UNIT: "Kepala Unit",
  KEPALA_DIVISI: "Kepala Divisi",
  DIREKTUR: "Direktur",
  SUPERADMIN: "SUPERADMIN"
};

export const USERS_WITH_SUBORDINATES = [
  ACCESS_LEVEL.KEPALA_DIVISI,
  ACCESS_LEVEL.KEPALA_UNIT,
  ACCESS_LEVEL.KEPALA_KANTOR,
  ACCESS_LEVEL.SUPERADMIN
];