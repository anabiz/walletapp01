import createError, { HttpError } from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import v1Route from "./routes"; 

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();


const app = express();

app.use(cors());

app.disable("x-powered-by");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//can access route 'http://localhost:3001/apiv1/'
app.use("/apiv1", v1Route);

// catch 404 and forward to error handler
app.use(function (_req: Request, _res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: "couldn't access page, please retry again" });
});

export default app;
