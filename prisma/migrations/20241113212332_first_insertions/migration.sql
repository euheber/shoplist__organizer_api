/*
  Warnings:

  - Added the required column `link` to the `Shoplist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Shoplist` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "item_name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "isPurchased" BOOLEAN NOT NULL DEFAULT false,
    "shoplistId" TEXT,
    CONSTRAINT "Item_shoplistId_fkey" FOREIGN KEY ("shoplistId") REFERENCES "Shoplist" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Shoplist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "event_name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Shoplist" ("event_name", "id", "owner") SELECT "event_name", "id", "owner" FROM "Shoplist";
DROP TABLE "Shoplist";
ALTER TABLE "new_Shoplist" RENAME TO "Shoplist";
CREATE UNIQUE INDEX "Shoplist_owner_key" ON "Shoplist"("owner");
CREATE UNIQUE INDEX "Shoplist_link_key" ON "Shoplist"("link");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
