import { Request, Response, NextFunction } from "express";

export const schemaValidation = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const validation = schema.validate(req.body);

      if (validation.error) {
        res.status(422).send(validation.error.details[0].message);
        return;
      }
      next();
    }
}