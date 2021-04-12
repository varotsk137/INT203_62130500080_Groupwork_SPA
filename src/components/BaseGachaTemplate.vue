<template>
  <div id="gachatemp" class="w-10/12 mx-auto my-5 space-y-5">
    <div id="banner" class="flex rounded-xl justify-center">
        <slot name="bannerimg"></slot>
    </div>
    <div id="roll" class="flex justify-center space-x-5 transform scale-50 lg:scale-100 md:scale-75 sm:scale-50 transition-transform ease-in-out duration-300">
      <button @click="roll1"><slot name="rollx1"></slot></button>
      <button @click="roll10"><slot name="rollx10"></slot></button>
    </div>
  </div>
</template>
<script>
export default {
    props: {

    },
    data() {
        return {

        }
    },
    methods:{
        roll1(){
            console.log("click roll1")
            this.$emit("roll1")
        },
        roll10(){
            console.log("click roll10")
            this.$emit("roll10")
        }
        }
    }
</script>
