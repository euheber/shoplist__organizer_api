/*
  Warnings:

  - You are about to drop the `Participants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `link` on the `Shoplist` table. All the data in the column will be lost.
  - Added the required column `acess_code` to the `Shoplist` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Participants_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Participants";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Shoplist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "event_name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "acess_code" TEXT NOT NULL
);
INSERT INTO "new_Shoplist" ("createdAt", "event_name", "id", "owner", "updatedAt") SELECT "createdAt", "event_name", "id", "owner", "updatedAt" FROM "Shoplist";
DROP TABLE "Shoplist";
ALTER TABLE "new_Shoplist" RENAME TO "Shoplist";
CREATE UNIQUE INDEX "Shoplist_owner_key" ON "Shoplist"("owner");
CREATE UNIQUE INDEX "Shoplist_acess_code_key" ON "Shoplist"("acess_code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
