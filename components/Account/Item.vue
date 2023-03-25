<template>
    <div class="flex items-center justify-center gap-5">
        <UIIcon :name="account.icon" :size="4" :bg-color="account.background_color" />
        <h1 class="font-bold text-xl">{{ account.title }}</h1>
    </div>
    <h1>{{ +account.amount }} {{ storeCurrencies.getCurrencyCustomer }}</h1>
</template>

<script setup lang="ts">
import { useCurrenciesStore } from '../../stores/currencies'

const storeCurrencies = useCurrenciesStore()

defineProps({
    account: { type: Object as PropType<Account>, required: true }
})

</script>

<style scoped></style>