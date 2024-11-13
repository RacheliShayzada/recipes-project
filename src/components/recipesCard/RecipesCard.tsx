"use client";

import React, { useState } from 'react';
import { Recipe } from '@/types/types';
import { deleteRecipe } from '@/services/recipe';
import styles from './RecipesCard.module.css';
import { useDisplayStore } from '@/services/providers/DisplayRecipeProvider'
import Favorite from '../favorite/Favorite';

export type RecipesCardProps = {
  recipe: Recipe;
  onDelete:any
};

function RecipesCard({ recipe, onDelete }: RecipesCardProps) {
  const { openModal } = useDisplayStore((state) => state,);
  
  const deleteCard = async () => {
    console.log('deleting card');
    try {
      await deleteRecipe(recipe._id!);
      const storedRecipes = JSON.parse(localStorage.getItem("recipes") || "null");

      if (storedRecipes && storedRecipes.documents) {
        const updatedRecipes = storedRecipes.documents.filter((doc: { _id: string }) => doc._id !== recipe._id);
        localStorage.setItem("recipes", JSON.stringify({ documents: updatedRecipes }));
      }
      const favorites = JSON.parse(localStorage.getItem("favorites") ||"[]");
      const updatedFavorites = favorites.filter((favoriteId: string) => {favoriteId !== recipe._id});
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      onDelete();
      console.log("Recipe deleted successfully!");
    } catch (error) {
      console.log("Failed to delete recipe. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <img
        src={recipe.imageUrl}
        alt={recipe.name}
        className={styles.image}
      />
      <div className={styles.content}>
        <div className={styles.headerContent}>
          <h2 className={styles.name}>{recipe.name}</h2>
          <Favorite recipeId={recipe._id} />
        </div>
        <p className={styles.category}>
          {Array.isArray(recipe.category) 
            ? recipe.category.join(', ') 
            : recipe.category}
        </p>	        
        <p className={styles.description}>{recipe.shortDescription}</p>
        <button className={styles.readMore} onClick={() => void openModal(recipe)}>Read more</button>
        <button onClick={deleteCard}>🗑️</button>
      </div>
    </div>
  );
}

export default RecipesCard;
