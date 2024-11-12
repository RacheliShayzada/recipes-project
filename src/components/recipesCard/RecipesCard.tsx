"use client";

import React, { useState } from 'react';
import { Recipe } from '@/types/types';
import styles from './RecipesCard.module.css';
import { useDisplayStore } from '@/services/providers/DisplayRecipeProvider'

export type RecipesCardProps = {
  recipe: Recipe;
  isFavorite: boolean;
};

function RecipesCard({ recipe, isFavorite }: RecipesCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);
  const { openModal } = useDisplayStore((state) => state,);

  console.log(recipe.category);

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
        <p className={styles.category}>
          {Array.isArray(recipe.category) 
            ? recipe.category.join(', ') 
            : recipe.category}
        </p>
        <p className={styles.description}>{recipe.shortDescription}</p>
        <button className={styles.readMore} onClick={()=> void openModal(recipe)}>Read more</button>
      </div>
    </div>
  );
}

export default RecipesCard;
