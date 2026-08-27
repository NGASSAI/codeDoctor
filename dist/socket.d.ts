import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
/**
 * Initialise Socket.IO sur le serveur HTTP Express.
 */
export declare function initialiserSocket(server: HttpServer): Server<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
/**
 * Récupérer l'instance Socket.IO.
 */
export declare function obtenirSocket(): Server<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
/**
 * Envoyer une notification en temps réel à un utilisateur.
 */
export declare function envoyerNotificationTempsReel(userId: string, notification: unknown): void;
//# sourceMappingURL=socket.d.ts.map