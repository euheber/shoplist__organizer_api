-- CreateTable
CREATE TABLE "Shoplist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "event_name" TEXT NOT NULL,
    "owner" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Participants" (
    "id" TEXT NOT NULL,
    "participant_email" TEXT NOT NULL,
    "shoplistId" TEXT,
    CONSTRAINT "Participants_shoplistId_fkey" FOREIGN KEY ("shoplistId") REFERENCES "Shoplist" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Shoplist_owner_key" ON "Shoplist"("owner");

-- CreateIndex
CREATE UNIQUE INDEX "Participants_id_key" ON "Participants"("id");
