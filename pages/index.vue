<script setup lang="ts">
import { useAccountsStore } from '../stores/accounts'
import { useCurrenciesStore } from '../stores/currencies'
import { useIconsStore } from '../stores/icons'
import { useOperationsStore } from '../stores/operations'
import { useCategoriesStore } from '../stores/categories'

const storeAccounts = useAccountsStore()
const storeCurrencies = useCurrenciesStore()
const storeCategories = useCategoriesStore()
const storeIcons = useIconsStore()
const storeOperations = useOperationsStore()

let showModal = ref(false)
let editId = ref(0)
let isLoading = ref(true)
let isExpensesCategories = ref(true)
let isIncomeCategories = ref(false)
let accountCustomer = ref({} as Account)
let currentCurrency = ref('')
let allAccounts = ref<Array<Account>>([])
let categories = ref<Array<Category>>([])
let categoriesExpenses = ref<Array<Category>>([])
let categoriesIncome = ref<Array<Category>>([])
let operations = ref<Array<Operation>>([])
let operationsExpenses = ref<Array<Operation>>([])
let operationsIncome = ref<Array<Operation>>([])

let operation = ref({
    account: {} as Account,
    id: Date.now(),
    amount: 0,
    category: {} as Category,
    commentary: "",
    date: new Date(),
    type: "expenses",
} as Operation)

function filterCategories() {
    categoriesExpenses.value = categories.value.filter((category) => category.type === "expenses")
    categoriesIncome.value = categories.value.filter((category) => category.type === "income")
}

function filterOperations() {
    operationsExpenses.value = operations.value.filter((operation) => operation.type === "expenses")
    operationsIncome.value = operations.value.filter((operation) => operation.type === "income")
}

function getCategory(category: Category) {
    operation.value.category = category
}

function toggleTypeCategory() {
    isExpensesCategories.value = !isExpensesCategories.value
    isIncomeCategories.value = !isIncomeCategories.value

    if (isExpensesCategories.value === true) {
        operation.value.type = "expenses"
    } else {
        operation.value.type = "income"
    }
}

function editOperationType() {
    if (isExpensesCategories.value === true) {
        operation.value.type = "expenses"
    } else {
        operation.value.type = "income"
    }
}

function updateAccountCustomer(account: Account) {
    storeAccounts.updateAccountCustomer(account)
    accountCustomer.value = storeAccounts.getAccountCustomer
    toggleTypeCategory()
}

function closeModal() {
    showModal.value = false
    editId.value = 0
    operation.value = {
        account: {} as Account,
        id: Date.now(),
        amount: 0,
        category: {} as Category,
        commentary: "",
        date: new Date(),
        type: "expenses"
    }
    editOperationType()
}

function addOperation() {
    let flag = storeOperations.addOperation(operation.value)
    filterOperations()

    if (flag) {
        storeAccounts.updateAccounts(operation.value)
        closeModal()
    }
}

function editOperation() {
    let flag = storeOperations.editOperation(operation.value)
    filterOperations()

    if (flag) {
        storeAccounts.updateAccounts(operation.value)
        closeModal()
    }
}

function deleteOperation() {
    let flag = storeOperations.deleteOperation(operation.value.id)

    filterOperations()

    if (flag) {
        if (operation.value.type === "expenses") {
            accountCustomer.value.amount += operation.value.amount
        } else {
            accountCustomer.value.amount -= operation.value.amount
        }
        closeModal()
    }
}

function getOperation(userOperation: Operation) {
    operation.value.account = userOperation.account
    operation.value.amount = userOperation.amount
    operation.value.category = userOperation.category
    operation.value.commentary = userOperation.commentary
    operation.value.date = userOperation.date
    operation.value.id = userOperation.id
    operation.value.type = userOperation.type
    editId.value = 1
    showModal.value = true
}

onMounted(async () => {
    await storeCategories.fetchCategories()
    categories.value = await storeCategories.getCategories.categories
    isLoading.value = false
    operations.value = storeOperations.getOperations
    accountCustomer.value = storeAccounts.getAccountCustomer
    currentCurrency.value = storeCurrencies.getCurrencyCustomer
    allAccounts.value = storeAccounts.getAccounts
    filterCategories()
    filterOperations()
})

</script>

<template>
    <Head>
        <Title>OBA - Budget App</Title>
    </Head>
    <div v-if="!isLoading">
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
                    <h1 v-if="+accountCustomer.amount >= 0">{{ +accountCustomer.amount }} {{
                        currentCurrency }}
                    </h1>
                    <h1 v-else class="text-red-700">{{ +accountCustomer.amount }} {{ currentCurrency }}</h1>
                </div>
            </div>
            <div class="flex items-center justify-evenly max-sm:block max-sm:text-center max-sm:space-y-3 text-2xl">
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
                <div class="text-center">
                    <OperationList @getOperation="getOperation" :operations="operationsExpenses" />
                    <UIAddButton @click="showModal = true" data-aos="fade-up" />
                </div>
            </div>

            <div v-if="isIncomeCategories">
                <div class="text-center">
                    <OperationList @getOperation="getOperation" :operations="operationsIncome" />
                    <UIAddButton @click="showModal = true" data-aos="fade-up" />
                </div>
            </div>
        </div>
        <div v-else>
            <h1>Sorry, you don't have any accounts</h1>
        </div>
    </div>
    <div v-else>
        <UISpinner />
    </div>


    <UIModal :show="showModal" @close="closeModal()" @click.self="closeModal()">
        <template #header v-if="!editId">
            <h1>Create a new operation</h1>
        </template>
        <template #default v-if="!editId">
            <div class="space-y-5">
                <div class="flex items-center justify-center">
                    <input
                        class="text-xl w-1/2 text-center appearance-none bg-secondary-color rounded py-2 px-4 focus:border-0"
                        v-model="operation.amount" type="number" placeholder="0">
                    <h1 class="ml-5 text-xl">{{ currentCurrency }}</h1>
                </div>
                <div>
                    <h1 class="text-xl font-bold mb-2">Account</h1>
                    <select v-model="operation.account"
                        class="bg-secondary-color w-full text-xl cursor-pointer focus:text-white p-3 rounded-2xl">
                        <option class="text-lg" :value=account v-for="account in allAccounts">
                            {{ account.title }}
                        </option>
                    </select>
                </div>
                <div>
                    <h1 class="text-xl font-bold">Categories</h1>
                    <div class="flex items-center mt-5 flex-wrap justify-center gap-5">
                        <CategoryList @getCategory="getCategory" :categories="categoriesExpenses"
                            v-if="isExpensesCategories" />
                        <CategoryList @getCategory="getCategory" :categories="categoriesIncome" v-if="isIncomeCategories" />
                    </div>
                </div>
                <div>
                    <h1 class="text-xl font-bold mb-2">Date</h1>
                    <input class="text-xl w-full appearance-none bg-secondary-color rounded py-2 px-4 focus:border-0"
                        v-model="operation.date" type="date" placeholder="Any commentary...">
                </div>
                <div>
                    <h1 class="text-xl font-bold mb-2">Commentary</h1>
                    <input class="text-xl w-full appearance-none bg-secondary-color rounded py-2 px-4 focus:border-0"
                        v-model="operation.commentary" type="text" placeholder="Any commentary...">
                </div>
            </div>
        </template>
        <template #footer v-if="!editId">
            <div class="flex items-center justify-evenly mt-10">
                <UIMainButton @click="addOperation()">
                    Add
                </UIMainButton>
                <UIMainButton @click="closeModal()">
                    Close
                </UIMainButton>
            </div>
        </template>
        <template #header v-if="editId">
            <h1>Edit a Operation</h1>
        </template>
        <template #default v-if="editId">
            <div class="space-y-5">
                <div class="flex items-center justify-center">
                    <input
                        class="text-xl w-1/2 text-center appearance-none bg-secondary-color rounded py-2 px-4 focus:border-0"
                        v-model="operation.amount" type="number" placeholder="0">
                    <h1 class="ml-5 text-xl">{{ currentCurrency }}</h1>
                </div>
                <div>
                    <h1 class="text-xl font-bold mb-2">Account</h1>
                    <select v-model="operation.account"
                        class="bg-secondary-color w-full text-xl cursor-pointer focus:text-white p-3 rounded-2xl">
                        <option class="text-lg" :value=account v-for="account in allAccounts">
                            {{ account.title }}
                        </option>
                    </select>
                </div>
                <div>
                    <h1 class="text-xl font-bold">Categories</h1>
                    <div class="flex items-center mt-5 flex-wrap justify-center gap-5">
                        <CategoryList @getCategory="getCategory" :categories="categoriesExpenses"
                            v-if="isExpensesCategories" />
                        <CategoryList @getCategory="getCategory" :categories="categoriesIncome" v-if="isIncomeCategories" />
                    </div>
                </div>
                <div>
                    <h1 class="text-xl font-bold mb-2">Date</h1>
                    <input class="text-xl w-full appearance-none bg-secondary-color rounded py-2 px-4 focus:border-0"
                        v-model="operation.date" type="date" placeholder="Any commentary...">
                </div>
                <div>
                    <h1 class="text-xl font-bold mb-2">Commentary</h1>
                    <input class="text-xl w-full appearance-none bg-secondary-color rounded py-2 px-4 focus:border-0"
                        v-model="operation.commentary" type="text" placeholder="Any commentary...">
                </div>
            </div>
        </template>
        <template #footer v-if="editId">
            <div class="flex items-center justify-evenly mt-10">
                <UIMainButton @click="editOperation()">
                    Edit
                </UIMainButton>
                <UIMainButton @click="deleteOperation()">
                    Delete
                </UIMainButton>
                <UIMainButton @click="closeModal()">
                    Close
                </UIMainButton>
            </div>
        </template>
    </UIModal>
</template>
