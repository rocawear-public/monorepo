import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { WebSocketServer } from "ws";
import { appRouter, type AppRouter } from "@habbo-extension/trpc/router/_app";
import { createContext } from "@habbo-extension/trpc/context";
import { ext } from "@habbo-extension/extension";

const { server, listen } = createHTTPServer({
  router: appRouter,
  createContext,
});

const wss = new WebSocketServer({ server });

applyWSSHandler<AppRouter>({
  wss,
  router: appRouter,
  createContext,
});

ext.run();
listen(2022);

console.log("Running server");
