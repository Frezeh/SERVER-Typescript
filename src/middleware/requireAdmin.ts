import { Request, Response, NextFunction } from "express";

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const admin = res.locals.user.admin;
  if (admin === false) {
    return res.sendStatus(403);
  }

  return next();
};

export default requireAdmin;