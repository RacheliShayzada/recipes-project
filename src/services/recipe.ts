import http from "./http";
import { Recipe } from "@/types/types";


export const getAllRecipes = async (): Promise<Recipe[]> => {
    try {
        const response = await http.get("/recipe");
        return response.data;
    } catch (error) {
        console.error("Error fetching recipes:", error);
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

export const createRecipe = async (recipe: Recipe): Promise<Recipe> => {
    try {
        const response = await http.post("/recipe", recipe);
        return response.data;
    } catch (error) {
        console.error("Error creating recipe:", error);
        throw error;
    }
};

export const createRecipes = async (recipe: Recipe[]): Promise<Recipe[]> => {
    try {
        const response = await http.post("/recipe", recipe);
        return response.data;
    } catch (error) {
        console.error("Error creating recipe:", error);
        throw error;
    }
};