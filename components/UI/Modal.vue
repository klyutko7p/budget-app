<template>
    <div v-if="show" class="overflow-scroll z-50 fixed inset-0 bg-[rgba(0,0,0,0.6)] text-white grid place-items-center"
        data-aos="zoom-out">
        <div class="bg-primary-color w-2/3 max-w-[500px] rounded-2xl p-10">
            <header class="font-bold text-2xl first-letter:uppercase">
                <slot name="header">Default header</slot>
                <hr class="w-full my-2 h-4" />
            </header>
            <main>
                <slot>Default main</slot>
            </main>
            <footer>
                <slot name="footer">
                    <UIMainButton @click="$emit('close')">Close</UIMainButton>
                </slot>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    show: { type: Boolean, default: false }
})
</script>
