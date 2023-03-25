<script setup lang="ts">
import { useAccountsStore } from '../stores/accounts'
import { useIconsStore } from '../stores/icons'
import { useCurrenciesStore } from '../stores/currencies'

const storeAccounts = useAccountsStore()
const storeIcons = useIconsStore()
const storeCurrencies = useCurrenciesStore()

let currentCurrency = ref('')
let accounts = ref<Array<Account>>([])
let showModal = ref(false)
let editId = ref(0)

let userAccount = ref({
    id: Date.now(),
    amount: 0,
    title: "",
    background_color: "#6495ED",
    icon: "",
} as Account)

function addAccount() {
    let flag = storeAccounts.addAccount(userAccount.value)

    if (flag) {
        closeModal()
    }
}

function editAccount() {
    let flag = storeAccounts.editAccount(userAccount.value)

    if (flag) {
        closeModal()
    }
}

function deleteAccount() {
    let flag = storeAccounts.deleteAccount(userAccount.value.id)

    if (flag) {
        closeModal()
    }
}

function getAccount(account: Account) {
    userAccount.value.id = account.id
    userAccount.value.title = account.title
    userAccount.value.background_color = account.background_color
    userAccount.value.icon = account.icon
    userAccount.value.amount = account.amount
    editId.value = 1
    showModal.value = true
}

function closeModal() {
    showModal.value = false
    editId.value = 0
    userAccount.value = {
        id: Date.now(),
        amount: 0,
        title: "",
        background_color: "#6495ED",
        icon: "",
    }
}


onMounted(() => {
    accounts.value = storeAccounts.getAccounts
    currentCurrency.value = storeCurrencies.getCurrencyCustomer
})

</script>

<template>
    <div v-if="accounts?.length > 0">
        <div class="text-center mb-5" data-aos="fade-down">
            <h1 class="text-muted-color text-xl">Sum:</h1>
            <h1 class="text-3xl">{{ storeAccounts.getFullSum }} {{ currentCurrency }}</h1>
        </div>
        <div class="flex flex-col gap-5">
            <AccountList :accounts="accounts" @editAccount="getAccount" />
        </div>
        <div class="text-center duration-300">
            <UIAddButton @click="showModal = true" data-aos="fade-up" />
        </div>
    </div>
    <div v-else class="text-2xl space-y-3 text-center">
        <h1>O-ops, you don't have any account!</h1>
        <UIMainButton @click="showModal = true" data-aos="fade-up">Create account</UIMainButton>
    </div>
    <UIModal :show="showModal" @close="closeModal()" @click.self="closeModal()">
        <template #header v-if="!editId">
            <h1>Create a new Account</h1>
        </template>
        <template #default v-if="!editId">
            <div class="space-y-5">
                <div class="flex items-center justify-center">
                    <input
                        class="text-xl w-1/4 text-center appearance-none bg-secondary-color rounded py-2 px-4 focus:border-0"
                        v-model="userAccount.amount" type="number" placeholder="0">
                    <h1 class="ml-5 text-xl">{{ currentCurrency }}</h1>
                </div>
                <div>
                    <h1>Title of Account</h1>
                    <input
                        class=" text-xl mt-3 appearance-none bg-secondary-color border-2 border-gray-200 rounded w-full py-2 px-4 focus:border-hover-color"
                        v-model="userAccount.title" id="inline-full-name" type="text" placeholder="Any title">
                </div>
                <div>
                    <h1>Background color</h1>
                    <input type="color"
                        class="w-full text-xl mt-3 bg-secondary-color p-0.5 border-2 rounded h-10 border-white"
                        v-model="userAccount.background_color">
                </div>
                <div>
                    <h1 class="text-xl font-bold">Icons</h1>
                    <div class="flex items-center mt-5 flex-wrap justify-center gap-5">
                        <div v-for="icon in storeIcons.getIcons" class="hover:bg-hover-color duration-300 rounded-2xl p-1">
                            <Icon :class="{ 'bg-hover-color rounded-2xl p-1': userAccount.icon === icon }" :name="icon"
                                size="3em" @click="userAccount.icon = icon">
                            </Icon>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #footer v-if="!editId">
            <div class="flex items-center justify-evenly mt-10">
                <UIMainButton @click="addAccount()">
                    Add
                </UIMainButton>
                <UIMainButton @click="closeModal()">
                    Close
                </UIMainButton>
            </div>
        </template>
        <template #header v-if="editId">
            <h1>Edit a {{ userAccount.title }}</h1>
        </template>
        <template #default v-if="editId">
            <div class="space-y-5">
                <div class="flex items-center justify-center">
                    <input
                        class="text-xl w-1/4 text-center appearance-none bg-secondary-color rounded py-2 px-4 focus:border-0"
                        v-model="userAccount.amount" type="text" placeholder="0">
                    <h1 class="ml-5 text-xl">{{ currentCurrency }}</h1>
                </div>
                <div>
                    <h1>Title of Account</h1>
                    <input
                        class=" text-xl mt-3 appearance-none bg-secondary-color border-2 border-gray-200 rounded w-full py-2 px-4 focus:border-hover-color"
                        v-model="userAccount.title" id="inline-full-name" type="text" placeholder="Any title">
                </div>
                <div>
                    <h1>Background color</h1>
                    <input type="color"
                        class="w-full text-xl mt-3 bg-secondary-color p-0.5 border-2 rounded h-10 border-white"
                        v-model="userAccount.background_color">
                </div>
                <div>
                    <h1 class="text-xl font-bold">Icons</h1>
                    <div class="flex items-center mt-5 flex-wrap justify-center gap-5">
                        <div v-for="icon in storeIcons.getIcons" class="hover:bg-hover-color duration-300 rounded-2xl p-1">
                            <Icon :class="{ 'bg-hover-color rounded-2xl p-1': userAccount.icon === icon }" :name="icon"
                                size="3em" @click="userAccount.icon = icon">
                            </Icon>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #footer v-if="editId">
            <div class="flex items-center justify-evenly mt-10">
                <UIMainButton @click="editAccount()">
                    Edit
                </UIMainButton>
                <UIMainButton @click="deleteAccount()">
                    Delete
                </UIMainButton>
                <UIMainButton @click="closeModal()">
                    Close
                </UIMainButton>
            </div>
        </template>
    </UIModal>
</template>

<style scoped></style>