<template>
    <div v-for="category in categories" class="max-w-[100px]">
        <CategoryItem @click="$emit('editCategory', category)" :category="category" />
    </div>
</template>

<script lang="ts" setup>

defineProps({
    categories: { type: Array as PropType<Category[]>, required: true },
})

</script>