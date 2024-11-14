"use client";

import React from 'react';
import { Recipe } from '@/types/types';
import styles from './RecipesCard.module.css';
import { useDisplayStore } from '@/services/providers/DisplayRecipeProvider'
import Favorite from '../favorite/Favorite';

export type RecipesCardProps = {
  recipe: Recipe;
};

function RecipesCard({ recipe }: RecipesCardProps) {
  const { openModal } = useDisplayStore((state) => state,);

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
        <button className={styles.readMore} onClick={()=> void openModal(recipe)}>Read more</button>
      </div>
    </div>
  );
}

export default RecipesCard;
