"use client";

import React, { useState } from 'react';
import { Recipe } from '@/types/types';
import { deleteRecipe } from '@/services/recipe';
import styles from './RecipesCard.module.css';
import { useDisplayStore } from '@/services/providers/DisplayRecipeProvider'

export type RecipesCardProps = {
  recipe: Recipe;
  isFavorite: boolean;
  onDelete:any
};

function RecipesCard({ recipe, isFavorite,onDelete }: RecipesCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);
  const { openModal } = useDisplayStore((state) => state,);

  const toggleFavoriteInLocalStorage = () => {
    const favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = favorite
      ? favorites.filter(id => id !== recipe._id)
      : [...favorites, recipe._id];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorite(!favorite);
  };

  const handleFavoriteClick = () => {
    toggleFavoriteInLocalStorage();
  };

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
          <span
            className={styles.favoriteStar}
            onClick={handleFavoriteClick}
            style={{ cursor: 'pointer' }}
          >
            {favorite ? '🌟' : '⭐'}
          </span>
        </div>
        <p className={styles.category}>{recipe.category.join(', ')}</p>
        <p className={styles.description}>{recipe.shortDescription}</p>
        <button className={styles.readMore} onClick={() => void openModal(recipe)}>Read more</button>
        <button onClick={deleteCard}>🗑️</button>
      </div>
    </div>
  );
}

export default RecipesCard;
