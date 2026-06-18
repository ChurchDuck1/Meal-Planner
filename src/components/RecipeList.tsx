"use client";

export default function RecipeList({ recipes }) {
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