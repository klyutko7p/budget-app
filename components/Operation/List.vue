<script setup lang="ts">
defineProps({
    operations: { type: Array as PropType<Operation[]>, required: true },
})
const emit = defineEmits(['getOperation'])
const getOperation = (operation: Operation) => {
    emit('getOperation', operation)
}

</script>

<template>
    <div v-for="operation in operations" class="flex items-center justify-center flex-wrap flex-col "
        v-if="operations.length > 0" @click="getOperation(operation)">
        <OperationItem :operation="operation" />
    </div>
    <div v-else class="text-2xl mt-10">
        <h1>You don't have any operation!</h1>
    </div>
</template>

