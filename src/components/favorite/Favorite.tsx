import React, { useEffect, useState } from 'react';
import styles from './favorite.module.css';

type FavoriteProps = {
    recipeId?: string;
}

function Favorite({ recipeId }: FavoriteProps) {
    const [favorite, setFavorite] = useState<boolean>(false);

    useEffect(() => {
        if (!recipeId) return; 
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorite(favorites.includes(recipeId));
    }, [recipeId]); 

    const toggleFavoriteInLocalStorage = () => {
        if (!recipeId) return; 
        const favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
        const updatedFavorites = favorite
            ? favorites.filter(id => id !== recipeId)
            : [...favorites, recipeId];
            
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setFavorite(!favorite);
    };

    return (
        <span
            className={styles.favoriteStar}
            onClick={toggleFavoriteInLocalStorage}
            style={{ cursor: 'pointer' }}
        >
            {favorite ? '🌟' : '⭐'}
        </span>
    );
}

export default Favorite;
