<template>
    <Icon :name="name" :size="size + 'em'" class="rounded-[35px] p-5 text-center" :style="{ backgroundColor: bgColor }" />
</template>

<script setup lang="ts">

defineProps({
    name: { type: String, required: true },
    size: { type: Number, default: 4 },
    bgColor: { type: String, default: "#000000" },
})

</script>

