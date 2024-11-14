import { init } from 'next/dist/compiled/webpack/webpack';
import { createStore } from 'zustand';


export type DisplayState = {
    favoriteIds: string[];
}

export type FavoritesStore = {
    addFavorite: (recipeId: string) => void;
    removeFavorite: (recipeId: string) => void;
    initFavorite: () => void;
};

export type DisplayStore = DisplayState & FavoritesStore

const addFavoriteToLocalStorage = (recipeId: string) => {
    const favorites: string[] = JSON.parse(localStorage.getItem('favorite') || '[]');
    favorites.push(recipeId);
    localStorage.setItem('favorite', JSON.stringify(favorites));
}

const removeFavoritefromLocalStorage = (recipeId: string) => {
    const favorites: string[] = JSON.parse(localStorage.getItem('favorite') || '[]');
    const filtered = favorites.filter(id => id !== recipeId);
    localStorage.setItem('favorite', JSON.stringify(filtered));
}

export const defaultDisplayState:DisplayState = {
    favoriteIds: [],
}

export const createDisplayFavoritesStore = (initState:DisplayState = defaultDisplayState)=>{
    return createStore<DisplayState>()((set)=>({
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
    initFavorite: () => set((state) => {
        const favorites: string[] = JSON.parse(localStorage.getItem('favorite') || '[]');
        return ({
            favoriteIds: [...favorites],
        })
    })
}))};
