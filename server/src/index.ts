import "reflect-metadata";
import express from "express";
import session from "express-session";
import { MikroORM, RequestContext } from "@mikro-orm/core";
import mikroConfig from "./mikro-orm.config";
import { activitiesRouter } from "./routes/activities";
import withContext from "./middleware/withContext";
import { isAuth } from "./middleware/isAuth";
import { __prod__ } from "./utils/constants";

declare module "express-session" {
  interface SessionData {
    firmId: number;
  }
}

const main = async () => {
  const app = express();

  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  app.use(
    session({
      name: "auth_token",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        sameSite: "lax",
        httpOnly: false,
        secure: __prod__,
        domain: __prod__ ? "production domain here" : undefined,
      },
      secret: "secretkey",
      saveUninitialized: false,
      resave: false,
    })
  );

  app.get("/giveauth/:firmId", (req, res) => {
    req.session.firmId = parseInt(req.params.firmId);
    res.send(`authentication token set for firmId ${req.params.firmId}`);
  });
  app.use(express.json());

  app.use((_req, _res, next) => {
    RequestContext.create(orm.em, next);
  });
  app.use(withContext);
  app.use("/activity", isAuth, activitiesRouter);

  app.listen(4000, () => {
    console.log(`server started on localhost:4000`);
  });
};

main().catch((err) => {
  console.error(err);
});
