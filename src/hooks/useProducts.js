import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/productService";


export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productService.getAll,
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
};

export const useProductsByCategory = (category) => {
  return useQuery({
    queryKey: ["products", "category", category],
    queryFn: () => productService.getByCategory(category),
    enabled: !!category,
  });
};