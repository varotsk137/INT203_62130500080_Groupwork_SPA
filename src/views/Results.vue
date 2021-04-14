<template>
  <div id="resultpage">
    <base-container>
      <template v-slot:con-head>Result</template>
      <template v-slot:default>
        <base-gacha-template @roll1="draw" @roll10="draw">
          <template v-slot:bannerimg>
            <div class="w-11/12 h-max border border-gray-500 rounded-2xl p-8">
              <div
                id="results"
                class="grid grid-cols-5 grid-rows-2 justify-items-center gap-y-8"
              >
                <div
                  class="w-24 h-24 bg-blue-200"
                  v-for="c in currentDraws"
                  :key="c.index"
                >
                  <img :src="getIconsUrl(this.game, c.alias)" />
                  <p class="text-center" :class="convertStar(c.rarity).cc">
                    {{ convertStar(c.rarity).star }}
                  </p>
                </div>
              </div>
            </div>
          </template>
          <template v-slot:rollx1
            ><img v-if="!inProcess" :src="getRollUrl(this.game, 1)"
          /></template>
          <template v-slot:rollx10
            ><img  v-if="!inProcess" :src="getRollUrl(this.game, 10)"
          /></template>
        </base-gacha-template>
        <div
          id="statistic"
          class="border-2 border-gray-500 mx-auto w-3/5 h-max px-5 py-2 rounded-2xl"
        >
          <div id="stat-header" class="text-center">
            <p>Statistic</p>
            <div id="bar" class="h-px w-4/5 bg-gray-500 mx-auto"></div>
          </div>
          <div id="stat-content" class="">
            <p>Total {{ totalRoll }} roll(s)</p>
            <p>
              Currently used <b>{{ calCurrency.num }}</b> {{ calCurrency.currency }}
            </p>
            <p>Currently get <b>{{ countMax }}</b> {{ maxStar }}✬, cal as {{ calPercent }}%</p>
            <p v-if="game==='genshin'">Need {{ calGuarantee }} more roll(s) to get 5✬.</p>
          </div>
        </div>
      </template>
    </base-container>
  </div>
</template>
<script>
export default {
  name: "Results",
  data() {
    return {
      game: "",
      roll: 0,
      gachaPool: [],
      currentDraws: [],
      serverUrl: "http://localhost:3000",
      // serverUrl: "http://171.6.162.180:3000",
      get4StarCount: 0,
      get5StarCount: 0,
      totalRoll: 0,
      maxStar: 0,
      countMax: 0,
      inProcess: false
    };
  },
  methods: {
    initPage() {
      this.game = this.$route.params.name;
      this.roll = parseInt(this.$route.params.num);
      if (this.game === "genshin") {
        this.maxStar = 5;
      } else {
        this.maxStar = 3;
      }
    },
    convertStar(rarity) {
      let stars = "";
      let color = "";
      for (let i = 0; i < rarity; i++) {
        stars += "✬";
      }
      switch (rarity) {
        case 1:
          color = "text-black";
          break;
        case 2:
          color = "text-green-500";
          break;
        case 3:
          color = "text-blue-500";
          break;
        case 4:
          color = "text-pink-500";
          break;
        case 5:
          color =
            "bg-gradient-to-l from-red-500 via-yellow-500 to-red-500 bg-clip-text text-transparent";
          break;
        default:
          break;
      }
      return { star: stars, cc: color };
    },
    getRollUrl(game, num) {
      return require("@/assets/gachapage/" + game + "x" + num + ".png");
    },
    getIconsUrl(game, alias) {
      return require(`@/assets/icons/${game}/${alias}.png`);
    },
    routeBack() {
      this.$router.go(-1);
    },
    async fetchPool() {
      try {
        const res = await fetch(`${this.serverUrl}/prizes?game=${this.game}`);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    async draw(numRoll) {
      this.changeProcess()
      this.currentDraws = [];
      this.totalRoll += numRoll;
      if (this.game === "genshin") {
        for (let i = 0; i < numRoll; i++) {
          let random = Math.floor(Math.random() * 1000);
          let drawpool = null;
          if (this.get5StarCount == 89) {
            //force get 5 star
            random = Math.floor(Math.random() * 6);
          } else if (this.get4StarCount >= 9) {
            //force get 4 star
            random = Math.floor(Math.random() * 52) + 6;
          }
          if (random < 3) {
            //5 star character
            drawpool = this.gachaPool.filter(
              (p) => p.rarity === 5 && p.type === "Character"
            );
            this.get5StarCount = 0;
            this.countMax++;
          } else if (random < 6) {
            //5 star weapon
            drawpool = this.gachaPool.filter(
              (p) => p.rarity === 5 && p.type === "Weapon"
            );
            this.get5StarCount = 0;
            this.countMax++;
          } else if (random < 32) {
            //4 star character
            drawpool = this.gachaPool.filter(
              (p) => p.rarity === 4 && p.type === "Character"
            );
            //Add Rollcount for and 5 star and reset 4 star count
            this.get5StarCount++;
            this.get4StarCount = 0;
          } else if (random < 58) {
            //4 star weapon
            drawpool = this.gachaPool.filter(
              (p) => p.rarity === 4 && p.type === "Weapon"
            );
            //Add Rollcount for and 5 star and reset 4 star count
            this.get5StarCount++;
            this.get4StarCount = 0;
          } else {
            //3 star weapon
            drawpool = this.gachaPool.filter((p) => p.rarity === 3);
            //Add Rollcount for 5 and 4 star
            this.get4StarCount++;
            this.get5StarCount++;
          }

          // Random items in same categories
          const random2 = Math.floor(Math.random() * drawpool.length);
          await this.storeItem2(drawpool[random2]);
          this.currentDraws.push(drawpool[random2]);
        }
      } else if (this.game === "bluearc") {
        // Blue Archive Gacha
        for (let i = 0; i < numRoll; i++) {
          let drawpool = null;
          const random = Math.floor(Math.random() * 1000);
          // Guarantee 2 star at roll 10
          if (i == numRoll - 1 && numRoll === 10) {
            if (random < 25) {
              drawpool = this.gachaPool.filter((p) => p.rarity === 3);
              this.countMax++;
            } else {
              drawpool = this.gachaPool.filter((p) => p.rarity === 2);
            }
          } else {
            if (random < 25) {
              //3 star
              drawpool = this.gachaPool.filter((p) => p.rarity === 3);
              this.countMax++;
            } else if (random < 210) {
              //2 star
              drawpool = this.gachaPool.filter((p) => p.rarity === 2);
            } else {
              //1 star
              drawpool = this.gachaPool.filter((p) => p.rarity === 1);
            }
          }
          const random2 = Math.floor(Math.random() * drawpool.length);
          await this.storeItem2(drawpool[random2]);
          this.currentDraws.push(drawpool[random2]);
        }
      } else {
        //Uma Musume gacha
        for (let i = 0; i < numRoll; i++) {
          let drawpool = null;
          const random = Math.floor(Math.random() * 1000);
          //Guarantee 2 star at 10 rolls
          if (i == numRoll - 1 && numRoll === 10) {
            if (random < 10) {
              //3 star banner
              drawpool = this.gachaPool.filter( 
                (p) => p.rarity === 3 && p.type === "2"
              );
              this.countMax++;
            } else if (random < 30) {
              //3 star out rate
              drawpool = this.gachaPool.filter(
                (p) => p.rarity === 3 && p.type === "1"
              );
              this.countMax++;
            } else {
              drawpool = this.gachaPool.filter((p) => p.rarity === 2);
            }
          } else {
            if (random < 10) {
              //3 star banner
              drawpool = this.gachaPool.filter(
                (p) => p.rarity === 3 && p.type === "2"
              );
              this.countMax++;
            } else if (random < 30) {
              //3 star out of rate
              drawpool = this.gachaPool.filter(
                (p) => p.rarity === 3 && p.type === "1"
              );
              this.countMax++;
            } else if (random < 210) {
              //2 star
              drawpool = this.gachaPool.filter((p) => p.rarity === 2);
            } else {
              //1 star
              drawpool = this.gachaPool.filter((p) => p.rarity === 1);
            }
          }
          const random2 = Math.floor(Math.random() * drawpool.length);
          await this.storeItem2(drawpool[random2]);
          this.currentDraws.push(drawpool[random2]);
        }
      }
      this.changeProcess()
    },
    changeProcess(){
      this.inProcess = !this.inProcess
    },
    async storeItem2(item) {
      try {
        const res = await fetch(`${this.serverUrl}/inv`);
        const data = await res.json()
        let isAdd = true
          if(data.length===0){
            await this.addItem(item)
          } else {
            for(let i = 0; i < data.length; i++){
              if(item.id === data[i].itemId){
                await this.updateItem(item,data[i].id,data[i].amount+1)
                isAdd = false
                break;
              }
            }
            if(isAdd){
              isAdd = true
              await this.addItem(item)
            }
        }
      } catch (error) {
        console.log(error)
      }
      
    },
    async updateItem(item, id, num){
      try {
        const res = await fetch(`${this.serverUrl}/inv/${id}`, {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              itemId: item.id,
              game: item.game,
              name: item.name,
              rarity: item.rarity,
              type: item.type,
              alias: item.alias,
              amount: num
            })
          })
          const data = await res.json()
          return data
      } catch (error) {
        console.log(error)
      }
    },
    async addItem(item) {
      try {
          const res = await fetch(`${this.serverUrl}/inv`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              itemId: item.id,
              game: item.game,
              name: item.name,
              rarity: item.rarity,
              type: item.type,
              alias: item.alias,
              amount: 1
            })
          })
          const data = await res.json()
          return data
      } catch (error) {
        console.log(error )
      }
    }
  },
  async created() {
    this.initPage();
    this.gachaPool = await this.fetchPool();
    this.draw(this.roll);
  },
  computed: {
    calCurrency() {
      let multiplier = 0;
      let cur = "";
      switch (this.game) {
        case "genshin":
          multiplier = 160;
          cur = "primogems";
          break;
        case "bluearc":
          multiplier = 120;
          cur = "gems";
          break;
        case "umamusu":
          multiplier = 150;
          cur = "jewels";
          break;
        default:
          break;
      }
      return { num: this.totalRoll * multiplier, currency: cur };
    },
    calPercent() {
      let num = this.countMax / this.totalRoll * 100
      num = num.toFixed(2)
      return num
    },
    calGuarantee() {
      return 90 - this.get5StarCount
    }
  },
};
</script>