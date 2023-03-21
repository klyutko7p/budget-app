import { defineStore } from "pinia";

export const useCategoriesStore = defineStore("categories", () => {
  let categories = ref();

  async function fetchCategories() {
    let { data: result } = await useFetch("/api/categories");
    categories.value = result.value;
  }

  const getCategories = computed(() => categories.value);

  return { getCategories };
});
