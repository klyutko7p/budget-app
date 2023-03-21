<template>
  <ClientOnly>
    <TheNavbar />
    <div class="container mx-auto mt-10 max-md:px-5">
      <slot></slot>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts"></script>

<style scoped></style>
