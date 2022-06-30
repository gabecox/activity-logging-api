import { NextFunction, Response } from "express";
import { MyContext } from "./withContext";

export const isAuth = async (
  req: MyContext,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.firmId) {
    res.send("No authentication!");
    return;
  }
  // user authenticated, set query filter accordingly
  req.em?.setFilterParams("firmId", { id: req.session.firmId });
  next();
};
