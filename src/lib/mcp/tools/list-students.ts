import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function userClient(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "list_students",
  title: "List students",
  description: "List students visible to the signed-in user, optionally filtered by school.",
  inputSchema: {
    school_id: z.string().uuid().optional().describe("Filter to students of this school."),
    class_name: z.string().optional().describe("Filter to a class name."),
    limit: z.number().int().min(1).max(200).optional().describe("Max rows to return (default 50)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ school_id, class_name, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    let q = userClient(ctx)
      .from("students")
      .select("id,first_name,last_name,class_name,school_id,parent_name,parent_email,enrollment_date")
      .limit(limit ?? 50);
    if (school_id) q = q.eq("school_id", school_id);
    if (class_name) q = q.eq("class_name", class_name);
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { students: data },
    };
  },
});
