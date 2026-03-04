import { useQuery } from "@tanstack/react-query";
import { productService } from "../../services/productService";

export const useProducts = (category) => {
  return useQuery({
    queryKey: ["products", category],
    queryFn:  () =>
      category
        ? productService.getByCategory(category)
        : productService.getAll(),
  });
};
