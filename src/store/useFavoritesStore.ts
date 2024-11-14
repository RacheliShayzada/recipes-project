'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FavoriteState = {
    favoriteIds: string[];
}

export type FavoritesAction = {
    addFavorite: (recipeId: string) => void;
    removeFavorite: (recipeId: string) => void;
};

export type FavoritesStore = FavoriteState & FavoritesAction;

export const useFavoritesStore = create<FavoritesStore>()(
    persist(
        (set) => ({
            favoriteIds: [],
            addFavorite: (recipeId: string) =>
                set((state) => ({
                    favoriteIds: [...state.favoriteIds, recipeId],
                })),
            removeFavorite: (recipeId: string) =>
                set((state) => ({
                    favoriteIds: state.favoriteIds.filter((id) => id !== recipeId),
                })),
        }),
        {
            name: 'favorites-storage', // Storage key name
        }
    )
);

// Define FavoriteStoreApi based on useFavoritesStore instead of createFavoritesStore
export type FavoriteStoreApi = typeof useFavoritesStore;
