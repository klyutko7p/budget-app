<!-- <template>
  <nav class="bg-secondary-color flex items-center justify-between px-10 py-3 ">
    <img src="~/assets/images/klyutko-logo.svg" class="w-64 max-sm:w-32" alt="">
    <div class="max-lg:hidden">
      <NuxtLink to="/" active-class="text-hover-color"
        class="text-center font-bold inline-block mr-5 text-lg duration-300 hover:text-hover-color">
        Home
      </NuxtLink>
      <NuxtLink to="/accounts" active-class="text-hover-color"
        class="text-center font-bold mr-5 text-lg duration-300 hover:text-hover-color">
        Accounts
      </NuxtLink>
      <NuxtLink to="/categories" active-class="text-hover-color"
        class="text-center font-bold mr-5 text-lg duration-300 hover:text-hover-color">
        Categories
      </NuxtLink>
      <NuxtLink to="/currency" active-class="text-hover-color"
        class="text-center font-bold text-lg duration-300 hover:text-hover-color">
        Currency
      </NuxtLink>
    </div>
    <div class="hidden max-lg:block">
      <div class="space-y-2">
        <div class="w-10 h-1 bg-white"></div>
        <div class="w-10 h-1 bg-white"></div>
        <div class="w-10 h-1 bg-white"></div>
      </div>
    </div>
  </nav>
</template> -->


<template>
  <header>
    <nav class="flex items-center justify-between px-5 py-3">
      <img src="~/assets/images/klyutko-logo.svg" class="w-64 max-sm:w-40" alt="">
      <div class="max-lg:hidden">
        <NuxtLink to="/" active-class="text-hover-color"
          class="text-center font-bold inline-block mr-5 text-lg duration-300 hover:text-hover-color">
          Home
        </NuxtLink>
        <NuxtLink to="/accounts" active-class="text-hover-color"
          class="text-center font-bold mr-5 text-lg duration-300 hover:text-hover-color">
          Accounts
        </NuxtLink>
        <NuxtLink to="/categories" active-class="text-hover-color"
          class="text-center font-bold mr-5 text-lg duration-300 hover:text-hover-color">
          Categories
        </NuxtLink>
        <NuxtLink to="/currency" active-class="text-hover-color"
          class="text-center font-bold text-lg duration-300 hover:text-hover-color">
          Currency
        </NuxtLink>
      </div>
      <div class="max-lg:block hidden space-y-2" v-if="!isActivatedBurgerMenu" @click="isActivatedBurgerMenu = true"
        data-aos="flip-down">
        <div class="w-8 h-1 bg-white"></div>
        <div class="w-8 h-1 bg-white"></div>
        <div class="w-8 h-1 bg-white"></div>
      </div>
      <div v-if="isActivatedBurgerMenu">
        <div class="max-lg:block hidden space-y-2">
          <h1 @click="isActivatedBurgerMenu = false" data-aos="flip-down" class="text-5xl">
            X
          </h1>
        </div>
        <div data-aos="fade-right"
          class="fixed bg-[#161513] top-0 gradient-border-r left-0 h-full w-1/2 z-10 flex flex-col items-center justify-center gap-16 text-center p-5">
          <img src="~/assets/images/klyutko-logo.svg" @click="$router.push('/'), isActivatedBurgerMenu = false"
            class="cursor-pointer w-full h-16" alt="" />
          <NuxtLink to="/" active-class="text-hover-color"
            class="font-bold inline-block text-2xl max-[300px]:text-base duration-300 hover:text-hover-color">
            Home
          </NuxtLink>
          <NuxtLink to="/accounts" active-class="text-hover-color"
            class="font-bold text-2xl duration-300 max-[300px]:text-base hover:text-hover-color">
            Accounts
          </NuxtLink>
          <NuxtLink to="/categories" active-class="text-hover-color"
            class="font-bold text-2xl duration-300 max-[300px]:text-base hover:text-hover-color">
            Categories
          </NuxtLink>
          <NuxtLink to="/currency" active-class="text-hover-color"
            class="font-bold text-2xl duration-300 max-[300px]:text-base hover:text-hover-color">
            Currency
          </NuxtLink>
          <h1 class="uppercase mr-10 text-center">© developed by Daniel klyutko</h1>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
let isActivatedBurgerMenu = ref(false);

</script>

<style scoped></style>
