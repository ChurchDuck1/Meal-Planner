import { prisma } from "@/lib/db";
import RecipeList from "../components/RecipeList";
import { ModeToggle } from "../components/ModeToggle"
import Link from "next/link"

export default async function Home() {
  const recipes = await prisma.recipe.findMany();
  return (
    <main className="p-8">
      <div className="flex justify-end">
        <ModeToggle />
      </div>
      <h1 className="text-3xl font-bold">Meal Planner</h1>
      <RecipeList recipes={recipes} />
      <h2>
        <Link href="/new-recipe">
          New Recipe
        </Link>
      </h2>
    </main>
  );
}
