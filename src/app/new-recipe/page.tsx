import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { createRecipe } from "./actions"

export default function NewRecipe() {
  return (
    <main className="p-8">

      <h1 className="text-3xl font-bold">Add new recipe</h1>

      <form action={createRecipe}>

        <div className="p-4">
          <Field>
            <FieldLabel htmlFor="recipe-name">Recipe name</FieldLabel>
            <Textarea id="recipe-name" name="recipeName" placeholder="Your recipe name." required />
          </Field>
        </div>

        <div className="p-4">
          <Field>
            <FieldLabel htmlFor="recipe-description">Recipe Description</FieldLabel>
            <Textarea id="recipe-description" name="description" placeholder="Some information about your recipe." required />
          </Field>
        </div>

        <div className="p-4">
          <Field>
            <FieldLabel htmlFor="cook-time">Cook Time (hours)</FieldLabel>
            <Input id="cook-time" name="cookTimeHours" type="number" step="0.25" min="0" placeholder="2" />
          </Field>
        </div>

        <div className="p-4">
          <Field>
            <FieldLabel>Ingredients</FieldLabel>
            <div className="flex flex-row gap-3">
              <Field orientation="horizontal">
                <Checkbox id="option-a" name="ingredients" value="1" />
                <FieldLabel htmlFor="option-a">Chicken</FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="option-b" name="ingredients" value="2" />
                <FieldLabel htmlFor="option-b">Pasta</FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="option-c" name="ingredients" value="3" />
                <FieldLabel htmlFor="option-c">Marinara</FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="option-d" name="ingredients" value="4" />
                <FieldLabel htmlFor="option-d">Broccoli</FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="option-e" name="ingredients" value="5" />
                <FieldLabel htmlFor="option-e">Olive Oil</FieldLabel>
              </Field>
            </div>
          </Field>
        </div>

        <Button type="submit" variant="outline">Save</Button>

      </form>

    </main>
  );
}
