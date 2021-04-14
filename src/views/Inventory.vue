<template>
    <base-container>
    <template v-slot:con-head>Inventory</template>
    <template v-slot:default>
        <div id="banners" class="grid grid-cols-3 justify-center gap-10 px-28 py-6 ">
            <button @click="showTable('genshin')">
                <img src="@/assets/banner/genshin.png" class="rounded-xl w-full transition-transform transform scale-100 hover:scale-110" />
            </button>
            <button @click="showTable('bluearc')">
                <img src="@/assets/banner/bluearchive.png" class="rounded-xl w-full transition-transform transform scale-100 hover:scale-110" />
            </button>
            <button @click="showTable('umamusu')">
                <img src="@/assets/banner/umamusu.png" class="rounded-xl  w-full transition-transform transform scale-100 hover:scale-110" />
            </button>
        </div>

        
        <div v-if="inventory.length>0 && show===true" class="space-y-3">
            <div class="mx-auto w-4/6 bg-gray-500 h-px"></div>  
            <div id="menu" class="w-4/6 mx-auto flex justify-center">
                <button @click="clearInventory" class="bg-red-500 rounded-full h-8 w-36 shadow-md text-white font-bold">Clear Inventory</button>
            </div>
            <table class="mx-auto w-8/12 border border-collapse border-gray-500">
                <tr>
                    <th class="border border-collapse border-gray-500"></th>
                    <th class="border border-collapse border-gray-500">Name</th>
                    <th class="border border-collapse border-gray-500">Amount</th>
                </tr>
                <tr v-for="inv in inventory" :key="inv.id">
                    <td class="align-center mx-auto border border-collapse border-gray-500" style="width:100px; height:100px"><img :src="getImg(inv.game ,inv.alias)"></td>
                    <th class="text-center border border-collapse border-gray-500">{{ inv.name }}</th>
                    <td class="text-center border border-collapse border-gray-500 w-32">x{{ inv.amount }}</td>
                </tr>
            </table>
        </div>
        <div v-else-if="inventory.length===0 && show===true" class="text-center align-center mx-auto text-2xl font-semibold space-y-3">
            <div class="mx-auto w-4/6 bg-gray-500 h-px"></div>
            <p>Nothing here yet..</p>
        </div>
        <div v-else class="text-center align-center mx-auto text-2xl font-semibold space-y-3">
            <div class="mx-auto w-4/6 bg-gray-500 h-px"></div>
            <p>Please select the game inventory you want to view.</p>
        </div>
    </template>
    </base-container>
</template>
<script>
export default {
    name: "Inventory",
    data() {
        return {
            game: '',
            inventory: [],
            serverUrl: 'http://localhost:3000',
            show: false,
            searchInput: '',
            sortMode: ''
            // sortBy: 'rarity'
        }
    },
    methods: {
        getImg(game, alias) {
            return require(`@/assets/icons/${game}/${alias}.png`);
        },
        async showTable(game){
            try {
                const res = await fetch(`${this.serverUrl}/inv?game=${game}&_sort=rarity,type,name&_order=desc,asc,asc`)
                this.inventory = await res.json()
                this.game = game
                this.show = true
            } catch (error) {
                console.log(error)
            }
        },
        async clearInventory(){
            for (let i = 0; i < this.inventory.length; i++) {
                const res = await fetch(`${this.serverUrl}/inv/${this.inventory[i].id}`, {
                    method: 'DELETE'
                })
                await res.json();
            }
            await this.showTable(this.game)
        }
    },
}
</script>