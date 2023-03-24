import { defineStore } from "pinia";

export const useIconsStore = defineStore("icons", () => {
  let icons = ref([
    "mdi:food-drumstick-outline",
    "teenyicons:gift-outline",
    "material-symbols:emoji-transportation-outline",
    "material-symbols:account-balance-wallet",
    "fluent:food-16-regular",
    "material-symbols:sports-handball",
    "material-symbols:family-restroom",
    "cil:education",
    "ic:baseline-home",
    "material-symbols:gfit-health",
    "material-symbols:question-mark",
    "material-symbols:attach-money",
    "ri:bank-line",
    "material-symbols:3p-outline",
    "ic:baseline-accessible",
    "ic:baseline-air",
    "ic:baseline-admin-panel-settings",
    "ic:baseline-ac-unit",
    "ic:outline-shopping-cart",
    "ph:apple-podcasts-logo-light",
    "ri:bear-smile-line",
    "ri:blaze-fill",
    "ri:apple-fill",
    "ri:bike-line",
    "ri:briefcase-2-line",
  ]);

  const getIcons = computed(() => icons.value);

  return { getIcons };
});
