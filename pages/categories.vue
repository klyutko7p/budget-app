<script lang="ts" setup>
import { useCategoriesStore } from '../stores/categories'
import { useIconsStore } from '../stores/icons'

const storeCategories = useCategoriesStore()
const storeIcons = useIconsStore()

let categories = ref<Array<Category>>([])
let categoriesExpenses = ref<Array<Category>>([])
let categoriesIncome = ref<Array<Category>>([])
let isLoading = ref(true)
let isExpensesCategories = ref(true)
let isIncomeCategories = ref(false)
let showModal = ref(false)
let editId = ref(0)

let userCategory = ref({
    _id: '',
    title: ''.trim(),
    type: 'expenses',
    background_color: '#6495ED',
    icon: '',
} as Category)


function getCategory(category: Category) {
    userCategory.value._id = category._id
    userCategory.value.title = category.title
    userCategory.value.background_color = category.background_color
    userCategory.value.icon = category.icon
    userCategory.value.type = category.type
    editId.value = 1
    showModal.value = true
}

async function addCategory() {
    let flag = await storeCategories.addCategory(userCategory.value)
    await storeCategories.fetchCategories()
    categories.value = await storeCategories.getCategories.categories
    filterCategories()
    if (flag) {
        closeModal()
    }
}

async function editCategory() {
    let flag = await storeCategories.editCategory(userCategory.value)
    await storeCategories.fetchCategories()
    categories.value = await storeCategories.getCategories.categories
    filterCategories()
    if (flag) {
        closeModal()
    }
}

async function deleteCategory() {
    let flag = await storeCategories.deleteCategory(userCategory.value)
    await storeCategories.fetchCategories()
    categories.value = await storeCategories.getCategories.categories
    filterCategories()
    if (flag) {
        closeModal()
    }
}

function closeModal() {
    showModal.value = false
    clearUserCategory()
    editId.value = 0
}

function clearUserCategory() {
    userCategory.value = {
        _id: '',
        title: ''.trim(),
        type: 'expenses',
        background_color: '#6495ED',
        icon: '',
    }
}

function filterCategories() {
    categoriesExpenses.value = categories.value.filter((category) => category.type === "expenses")
    categoriesIncome.value = categories.value.filter((category) => category.type === "income")
}

function toggleTypeCategory() {
    isExpensesCategories.value = !isExpensesCategories.value
    isIncomeCategories.value = !isIncomeCategories.value
}

onMounted(async () => {
    await storeCategories.fetchCategories()
    categories.value = await storeCategories.getCategories.categories
    filterCategories()
    isLoading.value = false
})

</script>

<template>
    <Head>
        <Title>
            OBA - Categories
        </Title>
    </Head>
    <div v-if="!isLoading">
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
        <div class="flex items-center justify-center gap-20 flex-wrap mt-10">
            <CategoryList @editCategory="getCategory" :categories="categoriesExpenses" v-if="isExpensesCategories" />
            <CategoryList @editCategory="getCategory" :categories="categoriesIncome" v-if="isIncomeCategories" />
        </div>
        <div class="text-center">
            <UIAddButton data-aos="fade-up" @click="showModal = true" />
        </div>
    </div>
    <div v-else>
        <UISpinner />
    </div>
    <UIModal :show="showModal" @close="closeModal()" @click.self="closeModal()">
        <template #header v-if="!editId">
            <h1>Create a new Category</h1>
        </template>
        <template #default v-if="!editId">
            <div class="space-y-5">
                <div>
                    <h1>Title</h1>
                    <input
                        class=" text-xl mt-3 appearance-none bg-secondary-color border-2 border-gray-200 rounded w-full py-2 px-4 focus:border-hover-color"
                        v-model="userCategory.title" id="inline-full-name" type="text" placeholder="Any title...">
                </div>
                <div>
                    <h1>Type</h1>
                    <select v-model="userCategory.type"
                        class="block text-xl mt-3 appearance-none w-full bg-secondary-color border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option class="uppercase">expenses</option>
                        <option class="uppercase">income</option>
                    </select>
                </div>
                <div>
                    <h1>Background color</h1>
                    <input type="color"
                        class="w-full text-xl mt-3 bg-secondary-color p-0.5 border-2 rounded h-10 border-white"
                        v-model="userCategory.background_color">
                </div>
                <div>
                    <h1 class="text-xl font-bold">Icons</h1>
                    <div class="flex items-center mt-5 flex-wrap justify-center gap-5">
                        <div v-for="icon in storeIcons.getIcons" class="hover:bg-hover-color duration-300 rounded-2xl p-1">
                            <Icon :class="{ 'bg-hover-color rounded-2xl p-1': userCategory.icon == icon }" :name="icon"
                                size="3em" @click="userCategory.icon = icon">
                            </Icon>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #footer v-if="!editId">
            <div class="flex items-center justify-evenly mt-10">
                <UIMainButton @click="addCategory()">
                    Add
                </UIMainButton>
                <UIMainButton @click="closeModal()">
                    Close
                </UIMainButton>
            </div>
        </template>
        <template #header v-if="editId">
            <h1>Edit a Category</h1>
        </template>
        <template #default v-if="editId">
            <div class="space-y-5">
                <div>
                    <h1>Title</h1>
                    <input
                        class="appearance-none text-xl mt-3 bg-secondary-color border-2 border-gray-200 rounded w-full py-2 px-4 focus:border-hover-color"
                        v-model="userCategory.title" type="text" placeholder="Any title...">
                </div>
                <div>
                    <h1>Type</h1>
                    <select v-model="userCategory.type"
                        class="block text-xl mt-3 appearance-none w-full bg-secondary-color border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option class="uppercase">expenses</option>
                        <option class="uppercase">income</option>
                    </select>
                </div>
                <div>
                    <h1>Background color</h1>
                    <input type="color"
                        class="w-full text-xl mt-3 bg-secondary-color p-0.5 border-2 rounded h-10 border-white"
                        v-model="userCategory.background_color">
                </div>
                <div>
                    <h1 class="text-xl font-bold">Icons</h1>
                    <div class="flex items-center mt-5 flex-wrap justify-center gap-5">
                        <div v-for="icon in storeIcons.getIcons" class="hover:bg-hover-color duration-300 rounded-2xl p-1">
                            <Icon :class="{ 'bg-hover-color rounded-2xl p-1': userCategory.icon == icon }" :name="icon"
                                size="3em" @click="userCategory.icon = icon">
                            </Icon>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #footer v-if="editId">
            <div class="flex items-center justify-evenly mt-10">
                <UIMainButton @click="editCategory()">
                    Edit
                </UIMainButton>
                <UIMainButton @click="deleteCategory()">
                    Delete
                </UIMainButton>
                <UIMainButton @click="closeModal()">
                    Close
                </UIMainButton>
            </div>
        </template>
    </UIModal>
</template>

