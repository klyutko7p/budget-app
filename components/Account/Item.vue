<script setup lang="ts">
import { useCurrenciesStore } from '../../stores/currencies'
const storeCurrencies = useCurrenciesStore()

const emit = defineEmits(['editAccount'])
const editAccount = (account: Account) => {
    emit('editAccount', account)
}

defineProps({
    account: { type: Object as PropType<Account>, required: true },
})
</script>

<template>
    <div class="flex items-center text-center max-sm:space-y-3 justify-between max-sm:block bg-secondary-color p-5 rounded-2xl cursor-pointer hover:bg-hover-color duration-300"
        @click="editAccount(account)">
        <div class="flex items-center max-sm:space-y-3 max-sm:block justify-center gap-5">
            <UIIcon :name="account.icon" :size="4" :bg-color="account.background_color" />
            <h1 class="font-bold text-xl">{{ account.title }}</h1>
        </div>
        <div class="flex items-center max-sm:block max-sm:text-center gap-5">
            <h1>{{ +account.amount }} {{ storeCurrencies.getCurrencyCustomer }}</h1>
        </div>
    </div>
</template>
