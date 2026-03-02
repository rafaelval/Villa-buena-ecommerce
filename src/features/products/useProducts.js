import { useQuery } from "@tanstack/react-query";
import { productService } from "../../services/productService";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productService.getAll,
  });
};
