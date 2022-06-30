import { EntityManager, RequestContext } from "@mikro-orm/core";
import { NextFunction, Response, Request } from "express";

export interface MyContext extends Request {
  em?: EntityManager;
}

const withContext = (req: MyContext, _res: Response, next: NextFunction) => {
  const em = RequestContext.getEntityManager();
  if (em !== undefined) {
    req.em = em;
  } else {
    throw new Error("No Context");
    return;
  }
  next();
};

export default withContext;
