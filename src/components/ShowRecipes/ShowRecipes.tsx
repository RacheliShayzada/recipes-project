'use client';

import React from 'react';
import RecipesCard from '@/components/recipesCard/RecipesCard';
import { Recipe } from '@/types/types';
import styles from './ShowRecipes.module.css';

export type ShowRecipesProps = {
  recipes: Recipe[];
};

function ShowRecipes({ recipes }: ShowRecipesProps) {
  // קריאה ל-localStorage והמרת המידע מערך של IDs
  const favoriteRecipes: string[] = JSON.parse(localStorage.getItem('favorites') || '[]'); 

  return (
    <div className={styles.gridContainer}>
      {recipes.map((recipe, index) => (
        <RecipesCard
          key={index}
          recipe={recipe}
          isFavorite={favoriteRecipes.includes(recipe.id)}  // בדיקה אם המתכון נמצא ברשימת המועדפים
        />
      ))}
    </div>
  );
}

export default ShowRecipes;
