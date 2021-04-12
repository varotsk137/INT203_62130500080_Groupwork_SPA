<template>
  <div id="container" class="w-8/12 mx-auto my-5">
    <div
      id="container-header"
      class="rounded-t-2xl h-16 border-2 border-gray-300 bg-gray-600 text-white grid items-center pb-1"
    >
      <p class="text-3xl font-bold text-center">
        <slot name="con-head"></slot>
      </p>
    </div>
    <div
      class="border-gray-300 border-l-2 border-r-2 border-b-2 bg-gray-100 shadow-md h-max pt-3 py-8  rounded-b-2xl"
      id="container-body"
    >
      <slot> </slot>
    </div>
  </div>
</template>

<script>

</script>
