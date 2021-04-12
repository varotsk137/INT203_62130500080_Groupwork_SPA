<template>
    <div id="umamusu">
        <base-container>
            <template v-slot:con-head>Uma Musume Gacha Simulator</template>
            <template v-slot:default>
                <base-gacha-template @roll1="roll1" @roll10="roll10">
                    <template v-slot:bannerimg><img src="@/assets/gachapage/umamusubanner.jpg" class="rounded-xl shadow-xl" /></template>
                    <template v-slot:rollx1><img src="@/assets/gachapage/umamusux1.png"/></template>
                    <template v-slot:rollx10><img src="@/assets/gachapage/umamusux10.png"/></template>
                </base-gacha-template></template>
        </base-container>
    </div>
</template>
<script>
export default {
    name: "Umamusu",
    methods: {
        roll1(){
            this.$router.push({path: '/umamusu/results/1'})
        },
        roll10(){
            this.$router.push({path: '/umamusu/results/10'})
        }
    }
}
</script>