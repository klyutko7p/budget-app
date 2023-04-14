<script setup lang="ts">
import { useAccountsStore } from '../stores/accounts'
import { useCurrenciesStore } from '../stores/currencies'

const storeAccounts = useAccountsStore()
const storeCurrencies = useCurrenciesStore()

let isExpensesCategories = ref(true)
let isIncomeCategories = ref(false)
let accountCustomer = ref({} as Account)
let currentCurrency = ref('')
let allAccounts = ref<Array<Account>>([])

function toggleTypeCategory() {
    isExpensesCategories.value = !isExpensesCategories.value
    isIncomeCategories.value = !isIncomeCategories.value
}

function updateAccountCustomer(account: Account) {
    storeAccounts.updateAccountCustomer(account)
    accountCustomer.value = storeAccounts.getAccountCustomer

}

onMounted(() => {
    accountCustomer.value = storeAccounts.getAccountCustomer
    currentCurrency.value = storeCurrencies.getCurrencyCustomer
    allAccounts.value = storeAccounts.getAccounts
    console.log(storeAccounts.getAccounts)
})


</script>

<template>
    <Head>
        <Title>OBA - Budget App</Title>
    </Head>
    <div v-if="allAccounts.length > 0">
        <div class="text-right font-bold text-2xl">
            <select @change="updateAccountCustomer(accountCustomer)" v-model="accountCustomer"
                class="bg-secondary-color cursor-pointer focus:text-white p-3 rounded-2xl">
                <option class="text-lg" :value=account v-for="account in allAccounts">
                    {{ account.title }}
                </option>
            </select>
        </div>
        <div class="text-center mb-10">
            <h1 class="text-muted-color text-xl mb-3">Account:</h1>
            <div class="text-2xl flex items-center justify-center gap-2 font-bold">
                <h1>{{ accountCustomer.title }} ➖</h1>
                <h1>{{ +accountCustomer.amount }} {{ currentCurrency }}</h1>
            </div>
        </div>
        <div class="flex items-center justify-evenly text-2xl">
            <h1 class="text-2xl font-bold hover:text-hover-color duration-300 uppercase cursor-pointer"
                @click="toggleTypeCategory()" :class="{ 'text-hover-color underline': isExpensesCategories }">
                Expenses
            </h1>
            <h1 class="text-2xl font-bold hover:text-hover-color duration-300 uppercase cursor-pointer"
                @click="toggleTypeCategory()" :class="{ 'text-hover-color underline': isIncomeCategories }">
                Income
            </h1>
        </div>

        <div v-if="isExpensesCategories">
        </div>

        <div v-if="isIncomeCategories">

        </div>
    </div>
</template>
