<template>
  <div class="grid-rows-2 w-full  bg-gray-700 text-white">
    <div class="h-12 font-semibold text-2xl mx-auto flex items-center justify-center">
        Gacha Simulator
    </div>
    <div
      class="h-10 font-semibold text-lg space-x-5 mx-auto flex items-center justify-center"
    >
      <router-link to="/"><p class="hover:text-yellow-500 ease-in-out duration-300">Home</p></router-link>
      <p>  |  </p>
      <router-link to="/about"><p class="hover:text-yellow-500 ease-in-out duration-300">About</p></router-link>
      <!-- <p>  |  </p>
      <p class="hover:text-yellow-500 ease-in-out duration-300">T-pose</p> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "TheNavbar",
};
</script>