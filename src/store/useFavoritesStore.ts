'use client';

import { createStore } from 'zustand';

export type FavoriteState = {
    favoriteIds: string[];
}

export type FavoritesAction = {
    addFavorite: (recipeId: string) => void;
    removeFavorite: (recipeId: string) => void;
};

export type FavoritesStore = FavoriteState & FavoritesAction

const addFavoriteToLocalStorage = (recipeId: string) => {
    if(typeof window !== 'undefined'){
        const favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
        favorites.push(recipeId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

const removeFavoritefromLocalStorage = (recipeId: string) => {
    if(typeof window !== 'undefined'){
    const favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const filtered = favorites.filter(id => id !== recipeId);
    localStorage.setItem('favorites', JSON.stringify(filtered));
    }
}

export const defaultDisplayState: FavoriteState = {
    favoriteIds: JSON.parse(localStorage.getItem('favorites') || '[]'),
}

export const createFavoritesStore = (initState: FavoriteState = defaultDisplayState)=>{
    return createStore<FavoritesStore>()((set)=>({
    ...initState,
    addFavorite: (recipeId:string) => set((state) => {
        addFavoriteToLocalStorage(recipeId);
        return ({
            favoriteIds: [...state.favoriteIds, recipeId],
        })
    }),
    removeFavorite: (recipeId:string) => set((state) => {
        removeFavoritefromLocalStorage(recipeId);
        return ({
            favoriteIds: state.favoriteIds.filter(id => id !== recipeId),
        })
    }),
}))};
