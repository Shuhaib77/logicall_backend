import { Request, Response, NextFunction, RequestHandler } from "express";

const tryCatch = (routeHandler: RequestHandler) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await routeHandler(req, res, next);
    } catch (error:any) {
      res.status(400).json({
        message: "error",
        staatus: "failes",
        error_message: error.message,
      });
    }
  };
};

export default tryCatch;
