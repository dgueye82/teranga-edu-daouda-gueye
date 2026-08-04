import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { getSchools } from "@/services/schoolService";
import type { School } from "@/types/school";

interface SchoolContextProps {
  /** École active : celle de l'utilisateur, ou celle choisie par l'admin */
  activeSchoolId: string | null;
  setActiveSchoolId: (id: string | null) => void;
  /** true si l'utilisateur peut basculer entre plusieurs écoles (admin plateforme) */
  canSwitchSchool: boolean;
  schools: School[];
  activeSchool: School | null;
  isLoading: boolean;
}

const STORAGE_KEY = "teranga.activeSchoolId";

const SchoolContext = createContext<SchoolContextProps>({
  activeSchoolId: null,
  setActiveSchoolId: () => {},
  canSwitchSchool: false,
  schools: [],
  activeSchool: null,
  isLoading: false,
});

export const useSchoolScope = () => useContext(SchoolContext);

export const SchoolProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, userProfile, isAdmin } = useAuth();
  const [selectedId, setSelectedId] = useState<string | null>(() =>
    typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null
  );

  const { data: schools = [], isLoading } = useQuery({
    queryKey: ["schools"],
    queryFn: getSchools,
    enabled: !!user,
  });

  useEffect(() => {
    if (!isAdmin) return;
    if (selectedId) {
      window.localStorage.setItem(STORAGE_KEY, selectedId);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [selectedId, isAdmin]);

  const activeSchoolId = isAdmin ? selectedId : userProfile?.school_id ?? null;

  const value = useMemo<SchoolContextProps>(
    () => ({
      activeSchoolId,
      setActiveSchoolId: setSelectedId,
      canSwitchSchool: isAdmin,
      schools,
      activeSchool: schools.find((s) => s.id === activeSchoolId) ?? null,
      isLoading,
    }),
    [activeSchoolId, isAdmin, schools, isLoading]
  );

  return <SchoolContext.Provider value={value}>{children}</SchoolContext.Provider>;
};
