<script lang="ts" setup>
const emit = defineEmits(['getCategory'])
const getCategory = (category: Category) => {
    emit('getCategory', category)
}

defineProps({
    categories: { type: Array as PropType<Category[]>, required: true },
})
</script>

<template>
    <div v-for="category in categories" class="max-w-[100px]" data-aos="fade-up" @click="getCategory(category)">
        <CategoryItem :category="category" />
    </div>
</template>

