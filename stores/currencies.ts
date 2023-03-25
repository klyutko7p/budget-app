import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useCurrenciesStore = defineStore("currencies", () => {
  let currencies = ref();
  let currencyCustomer = ref("USD");

  async function fetchCurrencies() {
    let { data: result } = await useFetch("/api/currencies");
    currencies.value = result.value;
  }

  function updateCurrencyCustomer(currency: string) {
    currencyCustomer.value = currency;
    toast.success(`You pick ${currency}`);
  }

  const getCurrencies = computed(() => currencies.value);
  const getCurrencyCustomer = computed(() => currencyCustomer.value);

  return {
    getCurrencies,
    getCurrencyCustomer,
    fetchCurrencies,
    updateCurrencyCustomer,
  };
});
