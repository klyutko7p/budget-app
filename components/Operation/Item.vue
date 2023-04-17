<script setup lang="ts">
import { useAccountsStore } from '../../stores/accounts'
import { useCurrenciesStore } from '../../stores/currencies'

const storeAccounts = useAccountsStore()
const storeCurrencies = useCurrenciesStore()

let accountCustomer = storeAccounts.getAccountCustomer
let currentCurrency = storeCurrencies.getCurrencyCustomer

defineProps({
    operation: { type: Object as PropType<Operation>, required: true },
})
</script>

<template>
    <div v-if="operation.account === accountCustomer"
        class="m-5 flex items-center justify-between hover:cursor-pointer hover:bg-hover-color duration-300 max-sm:block max-sm:space-y-3 bg-secondary-color rounded-2xl px-5 py-3 w-1/2">
        <div class="flex items-center justify-center max-sm:space-y-3 max-sm:block gap-3">
            <UIIcon :bg-color="operation.category.background_color" :name="operation.category.icon" />
            <h1 class="first-letter:uppercase text-xl">{{ operation.category.title }}</h1>
        </div>
        <div class="text-xl">
            <h1>{{ operation.amount }} {{ currentCurrency }}</h1>
        </div>
    </div>
</template>
