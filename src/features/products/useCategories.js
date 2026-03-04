import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

const CATEGORIES_URL =`${API_URL}/products/categories`

const fetchCategories = async () => {
  const { data } = await axios.get(CATEGORIES_URL);
  return data;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};