<template>
    <Head>
        <Title>
            OBA - Currency
        </Title>
    </Head>
    <div v-if="!isLoading">
        <div class="flex mb-5 items-center justify-between max-md:flex-col">
            <h1 class="text-3xl font-bold">Your currency is: <span class="text-hover-color">{{ currencyCustomer
            }}</span></h1>
            <div class="relative max-md:mt-5 max-md:w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Icon name="ic:outline-search" size="1.5em" />
                </div>
                <input type="search" @input="searchCurrencies()" v-model="query"
                    class="block w-full p-4 pl-10 text-lg border border-gray-300 rounded-lg text-white bg-[#161513]"
                    placeholder="Title" />
            </div>
        </div>
        <div v-for="currency in currencies" :key="currency._id" v-if="currencies.length > 0"
            class="grid grid-cols-2 text-2xl p-10 text-center odd:bg-muted-color even:bg-secondary-color duration-300 cursor-pointer hover:bg-hover-color max-sm:text-lg max-sm:p-5"
            @click="updateCurrencyCustomer(currency.abbr)">
            <h1>{{ currency.title }}</h1>
            <h1>{{ currency.abbr }}</h1>
        </div>
        <div v-else class="text-center mt-16 text-4xl space-y-5">
            <h1> 😶‍🌫️ <br> Sorry, we don't have this currency </h1>
            <UIMainButton class="uppercase" @click="query = '', searchCurrencies()">Clear the Search
            </UIMainButton>
        </div>
    </div>
    <div v-else>
        <UISpinner />
    </div>
</template>

<script lang="ts" setup>
import { useCurrenciesStore } from '../stores/currencies'
const storeCurrencies = useCurrenciesStore()

let currencies = ref<Array<Currency>>([])
let isLoading = ref(true)
let currencyCustomer = ref("-")
let query = ref("")

function updateCurrencyCustomer(currency: string) {
    storeCurrencies.updateCurrencyCustomer(currency)
    currencyCustomer.value = storeCurrencies.getCurrencyCustomer
}

function searchCurrencies() {
    let fetchCurrencies = storeCurrencies.getCurrencies.currencies
    if (!query.value) {
        currencies.value = fetchCurrencies
    } else {
        currencies.value = fetchCurrencies.filter((currency: Currency) => currency.title.toLowerCase().includes(query.value.trim().toLowerCase()))
    }
}

onMounted(async () => {
    await storeCurrencies.fetchCurrencies()
    currencies.value = await storeCurrencies.getCurrencies.currencies
    currencyCustomer.value = storeCurrencies.getCurrencyCustomer
    isLoading.value = false
})


</script>