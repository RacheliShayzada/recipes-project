"use client";

import React, { useEffect, useState } from 'react';
import RecipesCard from '@/components/recipesCard/RecipesCard';
import { Recipe } from '@/types/types';
import styles from './ShowRecipes.module.css';
import Loading from '../loading/Loading';

export type ShowRecipesProps = {
  recipes: Recipe[],
  onDelete: any,
};

function ShowRecipes({ recipes, onDelete }: ShowRecipesProps) {
  
  return (
    <div className={styles.gridContainer}>
      {recipes.length> 0 ? recipes.map((recipe, index) => (
        <RecipesCard
          key={index}
          recipe={recipe}
          onDelete={onDelete}
        />
      )): <p>nothing to see in here</p>}
    </div>
  );
}

export default ShowRecipes;
