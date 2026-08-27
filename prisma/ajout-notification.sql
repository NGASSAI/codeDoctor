CREATE TYPE "NotificationType" AS ENUM (
  'NOUVEL_UTILISATEUR',
  'NOUVELLE_EXPERIENCE',
  'NOUVEAU_COMMENTAIRE',
  'NOUVELLE_REACTION',
  'NOUVEAU_SIGNALEMENT',
  'EXPERIENCE_APPROUVEE',
  'EXPERIENCE_REFUSEE',
  'EXPERIENCE_SIGNALEE'
);

CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "titre" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "lien" TEXT,
    "lue" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Notification_userId_idx"
ON "Notification"("userId");

CREATE INDEX "Notification_userId_lue_idx"
ON "Notification"("userId", "lue");

CREATE INDEX "Notification_createdAt_idx"
ON "Notification"("createdAt");

ALTER TABLE "Notification"
ADD CONSTRAINT "Notification_userId_fkey"
FOREIGN KEY ("userId")
REFERENCES "User"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;