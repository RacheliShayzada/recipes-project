"use client";

import React, { useState } from 'react';
import styles from './RecipesCard.module.css';

export type Recipe = {
  name: string;               // שם המתכון
  imageUrl: string;           // URL של התמונה
  category: string[];         // קטגוריות של המתכון
  ingredients: string[];      // רשימת מצרכים (מחרוזות)
  instructions: string;       // הוראות הכנה
  shortDescription: string;   // תאור קצר של המתכון
};

type RecipesCardProps = {
  recipe: Recipe;
  isFavorite: boolean;
};

function RecipesCard({ recipe, isFavorite }: RecipesCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
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
            {favorite ? '⭐' : '☆'}
          </span>
        </div>
        <p className={styles.category}>{recipe.category.join(', ')}</p>
        <p className={styles.description}>{recipe.shortDescription}</p>
        <button className={styles.readMore}>Read more</button>
      </div>
    </div>
  );
}

export default RecipesCard;
