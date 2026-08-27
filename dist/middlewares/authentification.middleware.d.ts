import { Request, Response, NextFunction } from "express";
export interface RequeteAuthentifiee extends Request {
    utilisateurId?: string;
}
export declare function authentificationMiddleware(req: RequeteAuthentifiee, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=authentification.middleware.d.ts.map