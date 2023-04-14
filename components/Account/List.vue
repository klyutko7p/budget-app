<template>
    <div v-for="account in accounts" data-aos="fade-up">
        <AccountItem :account="account" @edit-account="editAccount(account)" />
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