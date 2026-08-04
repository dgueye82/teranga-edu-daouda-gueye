import { Building2 } from "lucide-react";
import { useSchoolScope } from "@/contexts/SchoolContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ALL = "__all__";

const SchoolSelector = () => {
  const { canSwitchSchool, schools, activeSchoolId, setActiveSchoolId, activeSchool } =
    useSchoolScope();

  if (!canSwitchSchool) {
    if (!activeSchool) return null;
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Building2 className="h-4 w-4" />
        <span className="font-medium text-foreground">{activeSchool.name}</span>
      </div>
    );
  }

  return (
    <Select
      value={activeSchoolId ?? ALL}
      onValueChange={(v) => setActiveSchoolId(v === ALL ? null : v)}
    >
      <SelectTrigger className="w-[220px] bg-background" aria-label="École active">
        <Building2 className="h-4 w-4 mr-2 shrink-0 text-muted-foreground" />
        <SelectValue placeholder="Toutes les écoles" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>Toutes les écoles</SelectItem>
        {schools.map((s) => (
          <SelectItem key={s.id} value={s.id}>
            {s.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SchoolSelector;
