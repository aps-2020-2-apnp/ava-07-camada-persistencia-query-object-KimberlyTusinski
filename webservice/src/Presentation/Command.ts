import { IncomingMessage, ServerResponse } from "http";

// COMMAND DESIGN PATTERN
export interface Command {
  execute(req: IncomingMessage, resp: ServerResponse): void
}
