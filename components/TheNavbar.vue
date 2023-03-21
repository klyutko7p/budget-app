<template>
  <nav class="bg-secondary-color flex items-center justify-between px-10 py-3 ">
    <img src="~/assets/images/klyutko-logo.svg" class="w-64" alt="">
    <div class="max-lg:hidden">
      <NuxtLink to="/" active-class="text-hover-color"
        class="text-center font-bold inline-block mr-5 text-lg duration-300 hover:text-hover-color">
        Home
      </NuxtLink>
      <NuxtLink to="/accounts" active-class="text-hover-color"
        class="text-center font-bold mr-5 text-lg duration-300 hover:text-hover-color">
        Accounts
      </NuxtLink>
      <NuxtLink to="/charts" active-class="text-hover-color"
        class="text-center font-bold mr-5 text-lg duration-300 hover:text-hover-color">
        Charts
      </NuxtLink>
      <NuxtLink to="/categories" active-class="text-hover-color"
        class="text-center font-bold mr-5 text-lg duration-300 hover:text-hover-color">
        Categories
      </NuxtLink>
      <NuxtLink to="/payments" active-class="text-hover-color"
        class="text-center font-bold mr-5 text-lg duration-300 hover:text-hover-color">
        Payments
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
</template>
