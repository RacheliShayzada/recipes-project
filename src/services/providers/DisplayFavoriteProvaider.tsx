'use client';

import React, { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';
import { type DisplayState, type DisplayStore, createDisplayFavoritesStore } from '@/store/useFavoritesStore';

export type DisplayFavoriteStoreApi = ReturnType<typeof createDisplayFavoritesStore>;

export const DisplayFavoriteContext = createContext<DisplayFavoriteStoreApi | undefined>(undefined);

export interface DisplayFavoriteProviderProp {
    children: ReactNode;
}

export const DisplayFavoriteProvider = ({ children }: DisplayFavoriteProviderProp) => {
    const displayFavoriteRef = useRef<DisplayFavoriteStoreApi>();
    if (!displayFavoriteRef.current) {
        displayFavoriteRef.current = createDisplayFavoritesStore();
    }
    return (
        <DisplayFavoriteContext.Provider value={displayFavoriteRef.current}>
            {children}
        </DisplayFavoriteContext.Provider>
    );
};

export const useDisplayStore = <T,>(selector: (state: DisplayStore) => T,): T => {
    const displayFavoriteContext = useContext(DisplayFavoriteContext);

    if (!displayFavoriteContext) {
        throw new Error(`useStore must be used within DisplayRecipe Provider`);
    }

    return useStore(displayFavoriteContext, selector);
};
