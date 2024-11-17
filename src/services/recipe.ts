"use client"
import http from "./http";
import { Recipe } from "@/types/types";


export const getAllRecipes = async (): Promise<Recipe[]> => {
    const CACHE_KEY_DATA = "recipes";
    const CACHE_KEY_TIMESTAMP = "recipesTimestamp";
    const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 דקות במילישניות

    try {
        const cachedData = localStorage.getItem(CACHE_KEY_DATA);
        const cachedTimestamp = localStorage.getItem(CACHE_KEY_TIMESTAMP);

        if (cachedData && cachedTimestamp) {
            const timestamp = parseInt(cachedTimestamp, 10);

            if (Date.now() - timestamp < CACHE_EXPIRATION) {
                return JSON.parse(cachedData);
            }
        }
        const response = await http.get("/recipe");
        const recipes = response.data;
        localStorage.setItem(CACHE_KEY_DATA, JSON.stringify(recipes));
        localStorage.setItem(CACHE_KEY_TIMESTAMP, Date.now().toString());

        return recipes;
    } catch (error) {
        console.error("שגיאה בשליפת המתכונים:", error);
        throw error;
    }
};


export const getRecipeById = async (id: string): Promise<Recipe> => {
    try {
        const response = await http.get(`/recipe/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching recipe with ID ${id}:`, error);
        throw error;
    }
};

export const getRecipeByCategory = async (category: string): Promise<Recipe[]> => {
    try {
        const response = await http.get(`/recipe/category/${category}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching recipes for category ${category}:`, error);
        throw error;
    }
};

export const getRecipeByIds = async (ids: string[]): Promise<Recipe[]> => {
    try {
        const response = await http.post(`/recipe/ids`, {"ids": ids});
        return response.data;
    } catch (error) {
        console.error(`Error fetching recipes with IDs ${ids}:`, error);
        throw error;
    }
};


export const createRecipe = async (recipe: Omit<Recipe, '_id'>): Promise<Recipe> => {//+
    try {
        const response = await http.post("/recipe", recipe);
        return response.data;
    } catch (error) {
        console.error("Error creating recipe:", error);
        throw error;
    }
};

export const deleteRecipe = async (id: string): Promise<boolean> => {
    try {
        const response = await http.delete(`/recipe/${id}`);
        return response.data; 
    } catch (error) {
        console.error("Error deleting recipe:", error);
        throw error;
    }
};
