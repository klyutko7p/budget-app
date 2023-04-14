import VueApexCharts from "vue3-apexcharts";
export default defineNuxtPlugin((nuxtApp) => {
  if (typeof window !== "undefined") {
    nuxtApp.vueApp.use(VueApexCharts);
  }
});
