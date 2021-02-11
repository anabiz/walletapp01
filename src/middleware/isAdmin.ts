import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const adminAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userInfo = req.cookies.user;
  try {
    const user: any = jwt.verify(
      userInfo,
      `${process.env.ACCESS_TOKEN_SECRET}`,
    );
    if (!user.is_admin) return res.status(404).json("unauthorised");
    next();
    return;
  } catch (error) {
    return res.status(500).json({ error });
  }
};