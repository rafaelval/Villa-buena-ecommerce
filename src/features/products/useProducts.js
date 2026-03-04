import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

const PRODUCTS_URL = `${API_URL}/products?limit=200`

const fetchProducts = async () => {
  const { data } = await axios.get(PRODUCTS_URL);
  return data;
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};