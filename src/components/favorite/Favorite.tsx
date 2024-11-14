import React, { useEffect, useState } from 'react';
import styles from './favorite.module.css';
import { useFavoriteStore } from '@/services/providers/DisplayFavoriteProvaider';

type FavoriteProps = {
    recipeId?: string;
}

function Favorite({ recipeId }: FavoriteProps) {
    const [favorite, setFavorite] = useState<boolean>(false);
    const { favoriteIds, removeFavorite, addFavorite } = useFavoriteStore((state) => state)

    useEffect(() => {
        if (!recipeId) return;
        setFavorite(favoriteIds.includes(recipeId));
    }, [recipeId]);


    const toggleFavoriteInLocalStorage = () => {
        if (!recipeId) return;
        favorite ? removeFavorite(recipeId) : addFavorite(recipeId);
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
