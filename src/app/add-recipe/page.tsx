"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createRecipe } from "@/services/recipe";
import { getAllCategorys } from "@/services/category";
import styles from "./addRecipe.module.css";

const recipeSchema = z.object({
  recipe_name: z.string().min(1, "Name is required"),
  category: z.union([z.array(z.string()), z.string()]).transform((val) => (typeof val === "string" ? [val] : val)),
  imageUrl: z.string().url("Must be a valid URL"),
  instructions: z.string().min(1, "Instructions are required"),
  shortDescription: z.string().optional(),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

const AddRecipe: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
  });

  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [categories, setCategories] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getAllCategorys();
        setCategories(categoryData.map((cat) => cat.name));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<RecipeFormData> = async (data) => {
    if (ingredients.length === 0 || ingredients.some(ingredient => ingredient.trim() === "")) {
      setMessage("At least one valid ingredient is required.");
      return;
    }

    try {
      await createRecipe({
        name: data.recipe_name,
        category: data.category,
        imageUrl: data.imageUrl,
        ingredients,
        instructions: data.instructions,
        shortDescription: data.shortDescription || "",
      });
      setMessage("Recipe saved successfully!");
    } catch (error) {
      setMessage("Failed to save recipe. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backButton} onClick={() => window.history.back()}>
        &#8592; Back
      </div>
      <h2 className={styles.title}>Add Recipe</h2>
      {message && <p className={styles.message}>{message}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input className={styles.input} placeholder="Meal name" {...register("recipe_name")} />
        {errors.recipe_name && <p>{errors.recipe_name.message}</p>}

        <select className={styles.select} {...register("category")}>
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        {errors.category && <p>{errors.category.message}</p>}

        <input className={styles.input} placeholder="Image URL" {...register("imageUrl")} />
        {errors.imageUrl && <p>{errors.imageUrl.message}</p>}

        {ingredients.map((ingredient, index) => (
          <div key={index} className={styles.ingredientContainer}>
            <input
              className={styles.input}
              placeholder="Ingredient"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
            />
            <button type="button" onClick={() => removeIngredient(index)}>Remove</button>
          </div>
        ))}
        <button type="button" className={styles.addIngredientButton} onClick={addIngredient}>+</button>

        <textarea className={styles.textarea} placeholder="Instructions" {...register("instructions")}></textarea>
        {errors.instructions && <p>{errors.instructions.message}</p>}

        <input className={styles.input} placeholder="Short Description" {...register("shortDescription")} />
        
        <button type="submit" className={styles.addButton}>Add</button>
      </form>
    </div>
  );
};

export default AddRecipe;
