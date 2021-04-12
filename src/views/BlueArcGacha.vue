<template>
    <div id="bluearchive">
        <base-container>
            <template v-slot:con-head>Blue Archive Gacha Simulator</template>
            <template v-slot:default>
                <base-gacha-template @roll1="roll1" @roll10="roll10">
                    <template v-slot:bannerimg><img src="@/assets/gachapage/bluearchivebanner.jpg" class="rounded-xl shadow-xl" /></template>
                    <template v-slot:rollx1><img src="@/assets/gachapage/bluearcx1.png"/></template>
                    <template v-slot:rollx10><img src="@/assets/gachapage/bluearcx10.png"/></template>
                </base-gacha-template></template>
        </base-container>
    </div>
</template>
<script>
export default {
    name: "BlueArchive",
    methods: {
        roll1(){
            this.$router.push({path: '/bluearc/results/1'})
        },
        roll10(){
            this.$router.push({path: '/bluearc/results/10'})
        }
    }
}
</script>