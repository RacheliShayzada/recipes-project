"use client";

import React, { useEffect, useState } from 'react';
import RecipesCard from '@/components/recipesCard/RecipesCard';
import { Recipe } from '@/types/types';
import styles from './ShowRecipes.module.css';

export type ShowRecipesProps = {
  recipes: Recipe[];
};

function ShowRecipes({ recipes }: ShowRecipesProps) {
  const [favoriteRecipes, setFavoriteRecipes] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavoriteRecipes(storedFavorites);
  }, []); 
  
  return (
    <div className={styles.gridContainer}>
      {recipes.length> 0 ? recipes.map((recipe, index) => (
        <RecipesCard
          key={index}
          recipe={recipe}
          isFavorite={favoriteRecipes.includes(recipe._id||'')} 
        />
      )): <p>Loading...</p>}
    </div>
  );
}

export default ShowRecipes;
