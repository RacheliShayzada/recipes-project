import http from "./http";
import { Category } from "@/types/types";


export const getAllCategories = async (): Promise<Category[]> => {
    try {
        const response = await http.get("/category");
        return  response.data.documents;
    } catch (error) {
        console.error("Error fetching category:", error);
        throw error;
    }
};

export const createAllCategories = async (categories: Category[]): Promise<Category[]> => {
    try {
        const response = await http.post("/category", categories);
        console.log(response.data);
        return  response.data.documents;
    } catch (error) {
        console.error("Error fetching category:", error);
        throw error;
    }
};
