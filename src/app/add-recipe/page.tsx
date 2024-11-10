// src/app/add-recipe/AddRecipe.tsx
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { addRecipeToDB } from "../../service/respy";
import styles from "./addRecipe.module.css";

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

  const onSubmit = async (data: RecipeFormData) => {
    try {
      // await addRecipeToDB(data);
      console.log("Recipe saved to the database:", data);
    } catch (error) {
      console.error("Failed to save recipe:", error);
    }
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.backButton} onClick={() => window.history.back()}>
        &#8592; Back
      </div>
      <h2 className={styles.title}>Add Recipe</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          className={styles.input}
          placeholder="Meal name"
          {...register("recipe_name")}
        />
        {errors.recipe_name && <p>{errors.recipe_name.message}</p>}

        <select className={styles.select} {...register("category")}>
          <option value="">Category</option>
          <option value="a">Category A</option>
          <option value="b">Category B</option>
          <option value="c">Category C</option>
        </select>
        {errors.category && <p>{errors.category.message}</p>}

        <input
          className={styles.input}
          placeholder="Image URL"
          {...register("imageUrl")}
        />
        {errors.imageUrl && <p>{errors.imageUrl.message}</p>}

        {ingredients.map((ingredient, index) => (
          <div key={index} className={styles.ingredientContainer}>
            <input
              className={styles.input}
              placeholder="Ingredient"
              value={ingredient}
              onChange={(e) => {
                const newIngredients = [...ingredients];
                newIngredients[index] = e.target.value;
                setIngredients(newIngredients);
              }}
            />
          </div>
        ))}
        <button
          type="button"
          className={styles.addIngredientButton}
          onClick={addIngredientField}
        >
          +
        </button>
        {errors.ingredients && <p>{errors.ingredients.message}</p>}

        <textarea
          className={styles.textarea}
          placeholder="Instructions"
          {...register("instructions")}
        ></textarea>
        {errors.instructions && <p>{errors.instructions.message}</p>}

        <button type="submit" className={styles.addButton}>Add</button>
      </form>
    </div>
  );
};

export default AddRecipe;
