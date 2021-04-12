<template>
        <div class="flex flex-col lg:flex-row px-16 py-2 gap-10 justify-center">
            <button @click="pushRoute('genshin')">
          <div class="transform scale-100 hover:scale-110 transition-transform ease-in-out shadow-lg rounded-xl ">
            <img src="@/assets/banner/genshin.png" class="rounded-t-xl w-full" />
            <p class="bg-gray-500 text-center font-semibold text-sm text-gray-100 rounded-b-xl">
              Genshin Impact
            </p>
          </div>
          </button>
          <button @click="pushRoute('bluearc')">
          <div class="transform scale-100 hover:scale-110 transition-transform ease-in-out shadow-lg rounded-xl">
            <img src="@/assets/banner/bluearchive.png" class="rounded-t-xl w-full" />
            <p class="bg-gray-500 text-center font-semibold text-sm text-gray-100 rounded-b-xl">
              Blue Archive
            </p>
          </div>
          </button>
          <button @click="pushRoute('umamusu')">
          <div class="transform scale-100 hover:scale-110 transition-transform ease-in-out shadow-lg rounded-xl">
            <img src="@/assets/banner/umamusu.png" class="rounded-t-xl  w-full" />
            <p class="bg-gray-500 text-center font-semibold text-sm text-gray-100 rounded-b-xl">
              Uma Musume: Pretty Derby
            </p>
          </div>
          </button>
        </div>
</template>

<script>
export default {
  name: "TheGameBanner",
  methods: {
      pushRoute(path){
        //   console.log(path)
          this.$emit("pushRoute",path)
      }
  }
};
</script>