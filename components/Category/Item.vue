<template>
    <div class="cursor-pointer hover:scale-110 duration-200">
        <Icon :name="category.icon" size="6em" class="rounded-[35px] p-5 text-center"
            :style="{ backgroundColor: category.background_color }" />
        <h1 class="first-letter:uppercase mt-3 font-medium text-xl text-center whitespace-nowrap overflow-auto"
            :style="{ color: category.background_color }">
            {{
                category.title
            }}</h1>
    </div>
</template>

<script lang="ts" setup>

defineProps({
    category: { type: Object as PropType<Category>, required: true }
})

</script>