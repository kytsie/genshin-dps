import { createConfiguration, hooks } from "@midwayjs/hooks";
import * as orm from "@midwayjs/orm";
import { join } from "path";
import errorHandler from "./errorHandler";

export default createConfiguration({
  imports: [
    hooks({
      middleware: [errorHandler],
    }),
    orm,
  ],
  importConfigs: [join(__dirname, "./config/")],
});
