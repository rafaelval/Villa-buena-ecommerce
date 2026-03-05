import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/productService";

export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
};
