import { api } from "./api";

export const categoryService = {
  getAll: async () => {
    const { data } = await api.get("/products/categories");
    return data;
  },
};