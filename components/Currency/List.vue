<template>
    <div v-for="currency in currencies" :key="currency._id"
        class="grid grid-cols-2 text-2xl p-10 text-center odd:bg-muted-color even:bg-secondary-color duration-300 cursor-pointer hover:bg-hover-color max-sm:text-lg max-sm:p-5"
        data-aos="fade-up" @click="updateCurrencyCustomer(currency.abbr)">
        <CurrencyItem :currency="currency" />
    </div>
</template>

<script setup lang="ts">
import { useCurrenciesStore } from '~/stores/currencies'
const storeCurrencies = useCurrenciesStore()

defineProps({
    currencies: { type: Array as PropType<Currency[]> }
})

function updateCurrencyCustomer(currency: string) {
    storeCurrencies.updateCurrencyCustomer(currency)
}

</script>

<style scoped></style>