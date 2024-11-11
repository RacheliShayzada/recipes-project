import http from "./http";
import { Category } from "@/types/types";


export const getAllCategorys = async (): Promise<Category[]> => {
    try {
        const response = await http.get("/category");
        return  response.data.documents;
    } catch (error) {
        console.error("Error fetching category:", error);
        throw error;
    }
};
