import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listSchools from "./tools/list-schools";
import listStudents from "./tools/list-students";
import listStaff from "./tools/list-staff";
import getStudentPerformance from "./tools/student-performance";
import whoami from "./tools/whoami";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "teranga-edu-mcp",
  title: "Teranga EDU MCP",
  version: "0.1.0",
  instructions:
    "Tools for the Teranga EDU school management app. Callers act as the signed-in user; all reads respect the app's row-level security. Use `whoami` to verify connectivity, `list_schools` / `list_students` / `list_staff` to browse records, and `get_student_performance` for a student's grades.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [whoami, listSchools, listStudents, listStaff, getStudentPerformance],
});
