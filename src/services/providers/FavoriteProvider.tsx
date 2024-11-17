'use client';

import React, { type ReactNode, createContext, useContext } from 'react';
import { useStore } from 'zustand';
import { useFavoritesStore, type FavoritesStore } from '@/store/useFavoritesStore';

export const FavoriteContext = createContext<typeof useFavoritesStore | undefined>(undefined);

export interface FavoriteProviderProp {
    children: ReactNode;
}

export const FavoriteProvider = ({ children }: FavoriteProviderProp) => {
    return (
        <FavoriteContext.Provider value={useFavoritesStore}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavoriteStore = <T,>(selector: (state: FavoritesStore) => T): T => {
    const favoriteContext = useContext(FavoriteContext);

    if (!favoriteContext) {
        throw new Error(`useFavoriteStore must be used within FavoriteProvider`);
    }

    return useStore(favoriteContext, selector);
};
