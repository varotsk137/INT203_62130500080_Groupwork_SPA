<template>
  <div id="header">
    <!-- Component of Navbar goes here -->
    <the-navbar></the-navbar>
    <!-- Component of Banner goes here 300px -->
    
  </div>
  <div id="body">
  <!-- Router goes here -->
  <router-view />
  </div>
</template>
<script>
import TheNavbar from "@/components/TheNavbar.vue";
export default {
  components: {
    TheNavbar,
  }
};
</script>
<style>
body {
  background-color: #fff4e9;
}
</style>
