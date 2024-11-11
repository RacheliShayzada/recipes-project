import React from 'react';
import RecipesCard from '@/components/recipesCard/RecipesCard';
import { Recipe } from '@/types/types';
import styles from './ShowRecipes.module.css';

export type ShowRecipesProps = {
  recipes: Recipe[];
};

function ShowRecipes({ recipes }: ShowRecipesProps) {
  const favoriteRecipes: string[] = JSON.parse(localStorage.getItem('favorites') || '[]'); 

  return (
    <div className={styles.gridContainer}>
      {recipes.length> 0 ? recipes.map((recipe, index) => (
        <RecipesCard
          key={index}
          recipe={recipe}
          isFavorite={favoriteRecipes.includes(recipe.id||'')} 
        />
      )): <p>Loading...</p>}
    </div>
  );
}

export default ShowRecipes;
