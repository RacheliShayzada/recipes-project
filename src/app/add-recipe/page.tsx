"use client";
import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createRecipe } from "@/services/recipe";
import { getAllCategory } from "@/services/category";
import styles from "./addRecipe.module.css";

const recipeSchema = z.object({
  recipe_name: z.string().min(1, "Name is required"),
  category: z.union([z.array(z.string()), z.string()]).transform((val) => (typeof val === "string" ? [val] : val)),
  imageUrl: z.string().url("Must be a valid URL"),
  ingredients: z.array(z.string()).min(1, "At least one ingredient is required"),
  instructions: z.string().min(1, "Instructions are required"),
  shortDescription: z.string().optional(),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

const AddRecipe: React.FC = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: { ingredients: [""] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "ingredients" });
  const [categories, setCategories] = useState<string[]>([]); 
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getAllCategory();
        setCategories(categoryData.map((cat) => cat.name));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit: SubmitHandler<RecipeFormData> = async (data) => {
    try {
      await createRecipe({
        name: data.recipe_name,
        category: data.category,
        imageUrl: data.imageUrl,
        ingredients: data.ingredients,
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

        {fields.map((field, index) => (
          <div key={field.id} className={styles.ingredientContainer}>
            <input className={styles.input} placeholder="Ingredient" {...register(`ingredients.${index}` as const)} />
            <button type="button" onClick={() => remove(index)}>Remove</button>
          </div>
        ))}
        <button type="button" className={styles.addIngredientButton} onClick={() => append("")}>+</button>
        {errors.ingredients && <p>{errors.ingredients.message}</p>}

        <textarea className={styles.textarea} placeholder="Instructions" {...register("instructions")}></textarea>
        {errors.instructions && <p>{errors.instructions.message}</p>}

        <input className={styles.input} placeholder="Short Description" {...register("shortDescription")} />
        
        <button type="submit" className={styles.addButton}>Add</button>
      </form>
    </div>
  );
};

export default AddRecipe;
