"use client";
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const recipeSchema = z.object({
    recipe_name: z.string().min(1, "Name is required"),
    category: z.enum(["a", "b", "c"], {
        required_error: "Category is required",
        invalid_type_error: "Please select a valid category",
    }),
    imageUrl: z.string().url("Must be a valid URL"),
    ingredients: z.array(z.string()).min(1, "At least one ingredient is required"),
    instructions: z.string().min(1, "Instructions are required"),

});
type RecipeFormData = z.infer<typeof recipeSchema>;

const AddRecipe: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RecipeFormData>({
      resolver: zodResolver(recipeSchema),
    });
  
    const [ingredients, setIngredients] = useState<string[]>([""]);
  
    const onSubmit: SubmitHandler<RecipeFormData> = (data) => {
      console.log("Recipe submitted:", data);
    };
  
    const addIngredientField = () => {
      setIngredients([...ingredients, ""]);
    };
  
    return (
      <div>
        <h1>Add New Recipe</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Recipe Name:</label>
          <input type="text" {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
  
          <label>Category:</label>
          <select {...register("category")}>
            <option value="">Select a category</option>
            <option value="Dessert">Dessert</option>
            <option value="Main Course">Main Course</option>
            <option value="Appetizer">Appetizer</option>
          </select>
          {errors.category && <p>{errors.category.message}</p>}
  
          <label>Recipe Image URL:</label>
          <input type="text" {...register("imageUrl")} />
          {errors.imageUrl && <p>{errors.imageUrl.message}</p>}
  
          <label>Ingredients:</label>
          {ingredients.map((_, index) => (
            <div key={index}>
              <input
                type="text"
                {...register(`ingredients.${index}` as const)}
              />
              {errors.ingredients && errors.ingredients[index] && (
                <p>{errors.ingredients[index]?.message}</p>
              )}
            </div>
          ))}
          <button type="button" onClick={addIngredientField}>Add Ingredient</button>
  
          <label>Preparation Instructions:</label>
          <textarea {...register("instructions")} />
          {errors.instructions && <p>{errors.instructions.message}</p>}
  
          <button type="button" onClick={() => window.history.back()}>Back</button>
          <button type="submit">Add Recipe</button>
        </form>
      </div>
    );
  };

export default AddRecipe;
