import { api } from "./api";

export const productService = {
  getAll: async () => {
    const { data } = await api.get("/products");
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },
};