import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
/**
 * =========================================================
 * INITIALISATION SOCKET.IO
 * =========================================================
 */
export declare function initialiserSocket(server: HttpServer): Server<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
/**
 * =========================================================
 * RÉCUPÉRER SOCKET.IO
 * =========================================================
 */
export declare function obtenirSocket(): Server<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
/**
 * =========================================================
 * NOTIFICATION TEMPS RÉEL
 * =========================================================
 */
export declare function envoyerNotificationTempsReel(userId: string, notification: unknown): void;
//# sourceMappingURL=socket.d.ts.map