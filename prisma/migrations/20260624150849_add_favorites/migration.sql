/*
  Warnings:

  - Added the required column `favorite` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recipe" (
    "recipe_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recipeName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cookTimeHours" DECIMAL,
    "instructions" TEXT NOT NULL,
    "whitelist" BOOLEAN NOT NULL DEFAULT true,
    "lastUsedWeeks" INTEGER NOT NULL,
    "favorite" BOOLEAN NOT NULL
);
INSERT INTO "new_Recipe" ("cookTimeHours", "description", "instructions", "lastUsedWeeks", "recipeName", "recipe_id", "whitelist") SELECT "cookTimeHours", "description", "instructions", "lastUsedWeeks", "recipeName", "recipe_id", "whitelist" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
