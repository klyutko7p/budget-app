<template>
    <h1>{{ currency.title }}</h1>
    <h1>{{ currency.abbr }}</h1>
</template>

<script setup lang="ts">

defineProps({
    currency: { type: Object as PropType<Currency>, required: true }
})

</script>