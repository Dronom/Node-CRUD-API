import http from "http";
import dotenv from "dotenv";

import { invalidResponse } from "./src/utils/response.js";
import { endpointHandler } from "./src/utils/endpointHandler.js";

dotenv.config();
const port = process.env.port;
const host = process.env.host;
const NODE_ENV = process.env.NODE_ENV;

export const server = http
  .createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    console.log(req.method, req.url);
  })
  .listen(port, host, () => {
    console.log(
      `Server is running on ${host}:${port} in ${NODE_ENV} environment`
    );
  });

server.on("request", (req, res) => {
  try {
    endpointHandler(req, res);
  } catch (err) {
    invalidResponse({ res, message: err });
  }
});
