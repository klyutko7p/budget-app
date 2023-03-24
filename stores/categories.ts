import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast();

export const useCategoriesStore = defineStore("categories", () => {
  let categories = ref();

  async function fetchCategories() {
    let { data: result } = await useFetch("/api/categories");
    categories.value = result.value;
  }

  async function addCategory(userCategory: Category) {
    try {
      if (userCategory.title === "" || userCategory.icon === "") {
        toast.error("Title/Icon cannot be empty");
        return false;
      } else {
        await useFetch("/api/categories", {
          method: "POST",
          body: userCategory,
        });
        toast.success(`Added a'${userCategory.title}' category`);
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function editCategory(userCategory: Category) {
    try {
      if (userCategory.title === "" || userCategory.icon === "") {
        toast.error("Title/Icon cannot be empty");
        return false;
      } else {
        await useFetch("/api/categories", {
          method: "POST",
          body: userCategory,
        });
        toast.success(`Edited a '${userCategory.title}' category`);
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteCategory(userCategory: any) {
    try {
      userCategory.message = "delete";
      await useFetch("/api/categories", {
        method: "POST",
        body: userCategory,
      });
      toast.success(`Deleted a '${userCategory.title}' category`);
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  const getCategories = computed(() => categories.value);

  return {
    getCategories,
    fetchCategories,
    addCategory,
    editCategory,
    deleteCategory,
  };
});
