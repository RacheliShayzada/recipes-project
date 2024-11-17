import { createStore } from 'zustand';
import { Recipe } from '@/types/types'

export type DisplayState = {
    isModalOpen: boolean,
    selectedRecipe: Recipe | null
};
  
export type DisplayActions = {
    openModal: (recipe: Recipe) => void,
    closeModal: () => void
};

export type DisplayStore = DisplayState & DisplayActions

export const defaultDisplayState: DisplayState = {
    isModalOpen: false,
    selectedRecipe: null,
};

export const createDisplayRecipeStore = (initState: DisplayState = defaultDisplayState) => {
    return createStore<DisplayStore>()((set) => ({
        ...initState,
        openModal: (recipe: Recipe) => set(() => ({ isModalOpen: true, selectedRecipe: recipe })),
        closeModal: () => set(() => ({ isModalOpen: false, selectedRecipe: null })),
    }));
};
