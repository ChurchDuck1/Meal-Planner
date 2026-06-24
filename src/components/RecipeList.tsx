"use client";

type Recipe = {
  id: string | number;
  recipeName: string;
};

type RecipeListProps = {
  recipes: Recipe[];
};

export default function RecipeList({ recipes }: RecipeListProps) {
  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.id} onClick={() => console.log(recipe.recipeName)}>
          {recipe.recipeName}
        </li>
      ))}
    </ul>
  );
}