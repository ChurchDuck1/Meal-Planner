/*
  Warnings:

  - You are about to drop the `_ProductToRecipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `outOfStock` on the `Product` table. All the data in the column will be lost.
  - Added the required column `instructions` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastUsedWeeks` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_ProductToRecipe_B_index";

-- DropIndex
DROP INDEX "_ProductToRecipe_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ProductToRecipe";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" DECIMAL NOT NULL,
    "unit" TEXT NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("recipe_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RecipeIngredient_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("product_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "product_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productType" TEXT NOT NULL,
    "preferredBrand" TEXT NOT NULL,
    "product_cost" DECIMAL,
    "productUrl" TEXT NOT NULL,
    "productImage" TEXT
);
INSERT INTO "new_Product" ("preferredBrand", "productImage", "productType", "productUrl", "product_cost", "product_id") SELECT "preferredBrand", "productImage", "productType", "productUrl", "product_cost", "product_id" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_Recipe" (
    "recipe_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recipeName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cookTimeHours" DECIMAL,
    "instructions" TEXT NOT NULL,
    "whitelist" BOOLEAN NOT NULL DEFAULT true,
    "lastUsedWeeks" INTEGER NOT NULL
);
INSERT INTO "new_Recipe" ("cookTimeHours", "description", "recipeName", "recipe_id", "whitelist") SELECT "cookTimeHours", "description", "recipeName", "recipe_id", "whitelist" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "RecipeIngredient_recipeId_productId_key" ON "RecipeIngredient"("recipeId", "productId");
