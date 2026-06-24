/*
  Warnings:

  - The primary key for the `Recipe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `product_id` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `recipe_id` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN "productImage" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recipe" (
    "recipe_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recipeName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cookTimeHours" DECIMAL,
    "whitelist" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Recipe" ("cookTimeHours", "description", "recipeName", "whitelist") SELECT "cookTimeHours", "description", "recipeName", "whitelist" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
CREATE TABLE "new__ProductToRecipe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProductToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Product" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe" ("recipe_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__ProductToRecipe" ("A", "B") SELECT "A", "B" FROM "_ProductToRecipe";
DROP TABLE "_ProductToRecipe";
ALTER TABLE "new__ProductToRecipe" RENAME TO "_ProductToRecipe";
CREATE UNIQUE INDEX "_ProductToRecipe_AB_unique" ON "_ProductToRecipe"("A", "B");
CREATE INDEX "_ProductToRecipe_B_index" ON "_ProductToRecipe"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
