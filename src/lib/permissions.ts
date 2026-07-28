import type { UserRole } from "@/types/auth";

export type Permission =
  | "schools.view"
  | "schools.manage"
  | "staff.view"
  | "staff.manage"
  | "students.view"
  | "students.manage"
  | "payments.view"
  | "payments.manage"
  | "grades.view"
  | "grades.manage"
  | "attendance.view"
  | "attendance.manage";

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Administrateur",
  director: "Directeur",
  secretary: "Secrétaire",
  teacher: "Enseignant",
  inspector: "Inspecteur",
  school_life: "Vie scolaire",
  parent: "Parent",
  student: "Élève",
};

/**
 * Matrice d'accès — doit rester alignée avec les politiques RLS de la base.
 */
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    "schools.view", "schools.manage",
    "staff.view", "staff.manage",
    "students.view", "students.manage",
    "payments.view", "payments.manage",
    "grades.view", "grades.manage",
    "attendance.view", "attendance.manage",
  ],
  director: [
    "schools.view", "schools.manage",
    "staff.view", "staff.manage",
    "students.view", "students.manage",
    "payments.view", "payments.manage",
    "grades.view", "grades.manage",
    "attendance.view", "attendance.manage",
  ],
  secretary: [
    "schools.view",
    "staff.view",
    "students.view", "students.manage",
    "payments.view", "payments.manage",
    "attendance.view",
  ],
  teacher: [
    "schools.view",
    "students.view",
    "grades.view", "grades.manage",
    "attendance.view", "attendance.manage",
  ],
  school_life: [
    "schools.view",
    "students.view",
    "attendance.view", "attendance.manage",
  ],
  inspector: [
    "schools.view",
    "staff.view",
    "students.view",
    "payments.view",
    "grades.view",
    "attendance.view",
  ],
  parent: [],
  student: [],
};

export const can = (role: UserRole | undefined | null, permission: Permission): boolean =>
  !!role && (ROLE_PERMISSIONS[role] ?? []).includes(permission);
