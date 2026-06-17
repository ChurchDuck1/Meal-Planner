/* eslint-disable no-console */

/**
 * Meal Planner Seed Script
 *
 * Populates the DB with 5 products and 2 recipes.
 * Uses upsert so this script is safe to re-run (idempotent).
 *
 * Usage:
 *   npx prisma db seed
 *   -- or --
 *   node seed.js
 */

import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client.js";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./prisma/dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // ── Products ─────────────────────────────────────────────────────────────

  const chicken = await prisma.product.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      productType: "Protein",
      preferredBrand: "Perdue",
      cost: 8.99,
      outOfStock: false,
      productUrl: "https://www.walmart.com/ip/Perdue-Boneless-Skinless-Chicken-Breasts/123456",
    },
  });

  const pasta = await prisma.product.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      productType: "Grain",
      preferredBrand: "Barilla",
      cost: 1.49,
      outOfStock: false,
      productUrl: "https://www.walmart.com/ip/Barilla-Penne-Pasta-16-oz/234567",
    },
  });

  const marinara = await prisma.product.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      productType: "Sauce",
      preferredBrand: "Rao's",
      cost: 7.49,
      outOfStock: false,
      productUrl: "https://www.walmart.com/ip/Raos-Homemade-Marinara-Sauce-24-oz/345678",
    },
  });

  const broccoli = await prisma.product.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      productType: "Vegetable",
      preferredBrand: "Green Giant",
      cost: 2.29,
      outOfStock: false,
      productUrl: "https://www.walmart.com/ip/Green-Giant-Frozen-Broccoli-Florets-12-oz/456789",
    },
  });

  const oliveOil = await prisma.product.upsert({
    where: { id: 5 },
    update: {},
    create: {
      id: 5,
      productType: "Oil",
      preferredBrand: "California Olive Ranch",
      cost: 9.99,
      outOfStock: false,
      productUrl: "https://www.walmart.com/ip/California-Olive-Ranch-Extra-Virgin-Olive-Oil-16-9-oz/567890",
    },
  });

  console.log("✓ 5 products seeded");

  // ── Recipes ───────────────────────────────────────────────────────────────

  await prisma.recipe.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      recipeName: "Chicken Pasta Marinara",
      description: "A simple weeknight pasta with sautéed chicken breast and marinara sauce.",
      cookTimeHours: 0.5,
      whitelist: true,
      ingredients: {
        connect: [{ id: chicken.id }, { id: pasta.id }, { id: marinara.id }, { id: oliveOil.id }],
      },
    },
  });

  await prisma.recipe.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      recipeName: "Garlic Chicken & Broccoli",
      description: "Pan-seared chicken with roasted broccoli and a drizzle of olive oil.",
      cookTimeHours: 0.75,
      whitelist: true,
      ingredients: {
        connect: [{ id: chicken.id }, { id: broccoli.id }, { id: oliveOil.id }],
      },
    },
  });

  console.log("✓ 2 recipes seeded");
  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });