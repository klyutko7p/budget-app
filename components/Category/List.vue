<template>
    <div v-for="category in categories" class="max-w-[100px]" @click="editCategory(category)">
        <CategoryItem :category="category" />
    </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['editCategory'])
const editCategory = (category: Category) => {
    emit('editCategory', category)
}

defineProps({
    categories: { type: Array as PropType<Category[]>, required: true },
})

</script>