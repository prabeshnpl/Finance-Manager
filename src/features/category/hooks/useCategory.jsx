import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "../services/categoryService";

export function useCategory() {

  const queryClient = useQueryClient();
  const filters = {
    type: null, // income, expense
    category: null,
    startDate: null,
    endDate: null,
    member: null,
  };
    
  const categories = useQuery({
    queryKey: ["finance", "categories"],
    queryFn:  () => categoryService.getCategories(),
    retry: false
  });

  const categoryBreakdown = useQuery({
    queryKey: ["finance", "category-breakdown", filters],
    queryFn: () => categoryService.getCategoryBreakdown(filters),
    retry: false
  });

  // Category Mutations
  const createCategory = useMutation({
    mutationFn: categoryService.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["finance", "categories"]);
    },
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, data }) => categoryService.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["finance", "categories"]);
    },
  });

  const deleteCategory = useMutation({
    mutationFn: categoryService.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["finance", "categories"]);
    },
  });

  return {   
    categories: categories,
    categoryBreakdown: categoryBreakdown,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
