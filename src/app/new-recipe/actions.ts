"use server";

import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export async function createRecipe(formData: FormData) {
  const recipeName = formData.get("recipeName")?.toString().trim() ?? "";
  const description = formData.get("description")?.toString().trim() ?? "";

  const cookTimeRaw = formData.get("cookTimeHours")?.toString();
  const cookTimeHours = cookTimeRaw ? Number(cookTimeRaw) : null;

  // Checkboxes share the name "ingredients" — getAll collects every checked value
  const ingredientIds = formData
    .getAll("ingredients")
    .map((value) => Number(value))
    .filter((id) => !Number.isNaN(id));

  await prisma.recipe.create({
    data: {
      recipeName,
      description,
      cookTimeHours,
      whitelist: true,
      ingredients: {
        connect: ingredientIds.map((id) => ({ id })),
      },
    },
  });

  redirect("/");
}
