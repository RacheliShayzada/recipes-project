'use client'

import React from 'react'
import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'
import { type DisplayStore, createDisplayRecipeStore } from '@/store/useDisplayRecipeStore'

export type DisplayRecipeStoreApi = ReturnType<typeof createDisplayRecipeStore>

export const DisplayRecipeContext = createContext<DisplayRecipeStoreApi | undefined>(undefined,)

export interface DisplayRecipeProviderProps {
    children: ReactNode
}

export const DisplayRecipeProvider = ({ children}: DisplayRecipeProviderProps) => {
    const displayRecipeRef = useRef<DisplayRecipeStoreApi>()
    if (!displayRecipeRef.current) {
        displayRecipeRef.current = createDisplayRecipeStore()
    }
    return (
        <DisplayRecipeContext.Provider value={displayRecipeRef.current}>
            {children}
        </DisplayRecipeContext.Provider>
    )
}

export const useDisplayStore = <T,>(
    selector: (store: DisplayStore) => T,): T => {
    const displayRecipeContext = useContext(DisplayRecipeContext)
  
    if (!displayRecipeContext) {
      throw new Error(`useStore must be used within DisplayRecipe Provider`)
    }
  
    return useStore(displayRecipeContext, selector)
  }