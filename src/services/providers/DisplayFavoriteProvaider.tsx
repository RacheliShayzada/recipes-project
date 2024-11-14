'use client';

import React, { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';
import { type FavoritesStore, createFavoritesStore } from '@/store/useFavoritesStore';

export type FavoriteStoreApi = ReturnType<typeof createFavoritesStore>;

export const FavoriteContext = createContext<FavoriteStoreApi | undefined>(undefined);

export interface FavoriteProviderProp {
    children: ReactNode;
}

export const FavoriteProvider = ({ children }: FavoriteProviderProp) => {
    const displayFavoriteRef = useRef<FavoriteStoreApi>();
    if (!displayFavoriteRef.current) {
        displayFavoriteRef.current = createFavoritesStore();
    }
    return (
        <FavoriteContext.Provider value={displayFavoriteRef.current}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavoriteStore = <T,>(selector: (state: FavoritesStore) => T,): T => {
    const displayFavoriteContext = useContext(FavoriteContext);

    if (!displayFavoriteContext) {
        throw new Error(`useStore must be used within DisplayFavorite Provider`);
    }

    return useStore(displayFavoriteContext, selector);
};
