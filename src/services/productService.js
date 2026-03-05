import { api } from "./api";

export const productService = {
  getAll: async () => {
    const { data } = await api.get("/products?limit=200");
    return data;
  },
  getById: async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },
  getByCategory: async (category) => {
    const { data } = await api.get(`/products/category/${category}`);
    return data;
  },
};
