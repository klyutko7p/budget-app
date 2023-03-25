<template>
    <div v-for="account in accounts"
        class="flex items-center justify-between bg-secondary-color p-5 rounded-2xl cursor-pointer hover:bg-hover-color duration-300"
        data-aos="fade-up" @click="editAccount(account)">
        <AccountItem :account="account" />
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['editAccount'])
const editAccount = (account: Account) => {
    emit('editAccount', account)
}

defineProps({
    accounts: { type: Array as PropType<Account[]>, required: true },
})

</script>

<style scoped></style>