import { supabase } from "@/integrations/supabase/client";
import type { Staff, StaffFormData } from "@/types/staff";

interface StaffRow {
  id: string;
  school_id: string | null;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  position: string | null;
  department: string | null;
  hire_date: string | null;
  status: string | null;
  address: string | null;
}

const mapRow = (row: StaffRow): Staff => ({
  id: row.id,
  name: `${row.first_name ?? ""} ${row.last_name ?? ""}`.trim(),
  role: row.position ?? "",
  department: row.department ?? "",
  joinDate: row.hire_date ?? "",
  status: row.status ?? "Actif",
  email: row.email ?? undefined,
  phone: row.phone ?? undefined,
  address: row.address ?? undefined,
});

const splitName = (name: string) => {
  const parts = name.trim().split(/\s+/);
  return {
    first_name: parts[0] ?? "",
    last_name: parts.slice(1).join(" ") || parts[0] || "",
  };
};

const toRow = (data: StaffFormData, schoolId?: string | null) => ({
  ...splitName(data.name),
  position: data.role,
  department: data.department,
  hire_date: data.joinDate || null,
  status: data.status || "Actif",
  email: data.email || null,
  phone: data.phone || null,
  address: data.address || null,
  ...(schoolId !== undefined ? { school_id: schoolId } : {}),
});

/** Récupère le personnel, éventuellement filtré par école */
export const getStaffMembers = async (schoolId?: string | null): Promise<Staff[]> => {
  let query = supabase
    .from("staff")
    .select("*")
    .order("last_name", { ascending: true });

  if (schoolId) query = query.eq("school_id", schoolId);

  const { data, error } = await query;
  if (error) throw error;
  return ((data ?? []) as StaffRow[]).map(mapRow);
};

export const filterStaff = (
  staff: Staff[],
  searchTerm = "",
  departmentFilter?: string
): Staff[] => {
  let filtered = [...staff];

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        (s.role ?? "").toLowerCase().includes(term) ||
        (s.department ?? "").toLowerCase().includes(term) ||
        (s.email ?? "").toLowerCase().includes(term)
    );
  }

  if (departmentFilter === "teaching") {
    filtered = filtered.filter((s) => (s.role ?? "").toLowerCase().includes("enseignant"));
  } else if (departmentFilter === "administrative") {
    filtered = filtered.filter((s) => (s.department ?? "").toLowerCase() === "administration");
  }

  return filtered;
};

export const addStaffMember = async (
  data: StaffFormData,
  schoolId?: string | null
): Promise<Staff> => {
  const { data: inserted, error } = await supabase
    .from("staff")
    .insert(toRow(data, schoolId ?? null) as any)
    .select("*")
    .single();
  if (error) throw error;
  return mapRow(inserted as StaffRow);
};

export const updateStaffMember = async (
  id: string,
  data: StaffFormData
): Promise<Staff> => {
  const { data: updated, error } = await supabase
    .from("staff")
    .update(toRow(data) as any)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return mapRow(updated as StaffRow);
};

export const deleteStaffMember = async (id: string): Promise<void> => {
  const { error } = await supabase.from("staff").delete().eq("id", id);
  if (error) throw error;
};
