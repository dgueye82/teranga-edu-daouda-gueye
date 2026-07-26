// Ambient type for the Node/Deno `process.env` accessor used by MCP tool
// handlers. The tool files are bundled by @lovable.dev/mcp-js into a Deno
// edge function where `process.env` is available; this declaration keeps
// the frontend TypeScript build happy without pulling in @types/node.
declare const process: {
  env: Record<string, string | undefined>;
};
