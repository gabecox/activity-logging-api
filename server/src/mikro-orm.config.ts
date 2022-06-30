import { __prod__ } from "./utils/constants";
import { Options, ReflectMetadataProvider } from "@mikro-orm/core";
import { SqliteDriver } from "@mikro-orm/sqlite";
import { Activity } from "./entities/Activity";
import { BaseEntity } from "./entities/Base";
import path from "path";

export default {
  seeder: {
    path: path.join(__dirname, "./seeders"),
    defaultSeeder: "DatabaseSeeder",
    glob: "!(*.d).{js,ts}",
  },
  migrations: {
    path: path.join(__dirname, "./migrations"),
    glob: "!(*.d).{js,ts}",
  },
  filters: {
    firmId: {
      cond: (args) => ({ firmId: args.id }),
      entity: ["Activity"],
    },
    after: {
      cond: (args) => ({ startTime: { $gte: args.after } }),
      entity: ["Activity"],
      default: false,
    },
    before: {
      cond: (args) => ({ endTime: { $lte: args.before } }),
      entity: ["Activity"],
      default: false,
    },
  },
  type: "sqlite",
  dbName: "leapdev.db",
  entities: [Activity, BaseEntity],
  debug: !__prod__,
  metadataProvider: ReflectMetadataProvider,
} as Options<SqliteDriver>;

//
//    S-----------------------------E
//
// A----------------------------B
