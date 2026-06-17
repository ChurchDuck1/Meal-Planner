-- CreateTable
CREATE TABLE "Product" (
    "product_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productType" TEXT NOT NULL,
    "preferredBrand" TEXT NOT NULL,
    "product_cost" DECIMAL,
    "outOfStock" BOOLEAN NOT NULL,
    "productUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Recipe" (
    "product_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recipeName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cookTimeHours" DECIMAL,
    "whitelist" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "_ProductToRecipe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProductToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Product" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToRecipe_AB_unique" ON "_ProductToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToRecipe_B_index" ON "_ProductToRecipe"("B");
