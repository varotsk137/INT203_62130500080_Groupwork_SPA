<template>
    <div id="resultpage">
        <base-container>
            <template v-slot:con-head>Result</template>
            <template v-slot:default>
                <base-gacha-template>
                    <template v-slot:bannerimg>Test {{ this.game }}</template>
                    <template v-slot:rollx1>Another {{ this.rollNum }} roll</template>
                    <template v-slot:rollx10> Back </template>
                </base-gacha-template></template>
        </base-container>
    </div>
</template>
<script>
export default {
    name: "Results",
    data() {
        return {
            game: '',
            rollNum: 0
        }
    },
    methods:{
    },
    created(){
        this.game = this.$route.params.name
        this.rollNum = this.$route.params.num
    }
    
}
</script>