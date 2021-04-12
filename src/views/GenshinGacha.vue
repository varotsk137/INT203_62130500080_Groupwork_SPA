<template>
    <div id="genshin">
        <base-container>
            <template v-slot:con-head>Genshin Impact Gacha Simulator</template>
            <template v-slot:default>
                <base-gacha-template @roll1="roll1" @roll10="roll10">
                    <template v-slot:bannerimg><img src="@/assets/gachapage/genshinbanner.jpg" class="rounded-xl shadow-xl" /></template>
                    <template v-slot:rollx1><img src="@/assets/gachapage/genshinx1.png"/></template>
                    <template v-slot:rollx10 ><img src="@/assets/gachapage/genshinx10.png"/></template>
                </base-gacha-template>
            </template>
        </base-container>
    </div>
</template>
<script>
export default {
    name: "Genshin",
    methods: {
        roll1(){
            this.$router.push({path: '/genshin/results/1'})
        },
        roll10(){
            this.$router.push({path: '/genshin/results/10'})
        }
    }
}
</script>