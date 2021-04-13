<template>
    <base-container>
    <template v-slot:con-head>Inventory</template>
    <template v-slot:default>
        <div id="banners" class="grid grid-cols-3 justify-center gap-10 px-28 py-6 ">
            <img src="@/assets/banner/genshin.png" class="rounded-xl w-full transition-transform transform scale-100 hover:scale-110" />
            <img src="@/assets/banner/bluearchive.png" class="rounded-xl w-full transition-transform transform scale-100 hover:scale-110" />
            <img src="@/assets/banner/umamusu.png" class="rounded-xl  w-full transition-transform transform scale-100 hover:scale-110" />
        </div>
        
        <div>
            <table>
                <!-- for-loop -->
            </table>
        </div>
    </template>
    </base-container>
</template>
<script>
export default {
    name: "Inventory"
}
</script>