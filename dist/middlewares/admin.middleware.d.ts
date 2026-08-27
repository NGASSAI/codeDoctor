import { Response, NextFunction } from "express";
import { RequeteAuthentifiee } from "./authentification.middleware";
export declare function adminMiddleware(req: RequeteAuthentifiee, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=admin.middleware.d.ts.map