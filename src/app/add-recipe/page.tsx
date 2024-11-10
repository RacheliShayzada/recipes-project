"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createRecipe } from "@/services/recipe";
import styles from "./addRecipe.module.css";

const recipeSchema = z.object({
  recipe_name: z.string().min(1, "Name is required"),
  category: z.string().nonempty("Category is required"),
  imageUrl: z.string().url("Must be a valid URL"),
  ingredients: z.array(z.string()).min(1, "At least one ingredient is required"),
  instructions: z.string().min(1, "Instructions are required"),
  shortDescription: z.string().optional(),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

const AddRecipe: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
  });
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);  // Track loading state

  const onSubmit = async (data: RecipeFormData) => {
    console.log("Form Data Submitted:", data); // Debugging: log the form data
    setLoading(true); // Set loading to true when submitting

    try {
      const response = await createRecipe({
        name: data.recipe_name,
        imageUrl: data.imageUrl,
        category: [data.category], 
        ingredients: data.ingredients,
        instructions: data.instructions,
        shortDescription: data.shortDescription || "", 
      });

      console.log("Response from API:", response); // Debugging: check the API response
      setMessage("Recipe saved successfully!");
      reset();  // Reset the form if the submission was successful
    } catch (error) {
      console.error("Failed to save recipe:", error); // Debugging: log any error
      setMessage("Failed to save recipe. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after API call
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
      
      {message && <p className={styles.message}>{message}</p>} {/* Display success or error message */}

      {loading && <p>Loading...</p>} {/* Show loading message */}

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

        <input
          className={styles.input}
          placeholder="Short Description"
          {...register("shortDescription")}
        />

        <button type="submit" className={styles.addButton} disabled={loading}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
