<template>
  <div class="home">
    <!-- Add components to homepage here  -->
    <base-container>
      <template v-slot:con-head>Homepage</template>
      <template v-slot:default>
        <div class="py-3 text-center text-base font-medium">
          <p>Welcome to GACHA SIMULATOR website</p>
          <p>Please select the game you want to test your luck</p>
        </div>
        <the-game-banner @pushRoute="pushRoute"></the-game-banner>
        <div class="grid justify-items-center mt-5 space-y-3">
          <p class="text-center text-base font-medium">Click here to see the results</p>
          <img src="@/assets/banner/inventory.jpg" class="transform scale-90 hover:scale-100 transition-transform ease-in-out shadow-lg rounded-xl" />
        </div>
      </template>
    </base-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    pushRoute(path){
      this.$router.push(path)
    }
  }
};
</script>

