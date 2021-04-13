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
                  class="w-24 h-24 bg-blue-200 "
                  v-for="c in currentDraws"
                  :key="c.index"
                >
                  <img :src="getIconsUrl(this.game, c.alias)" />
                  <p class="text-center" :class="convertStar(c.rarity).cc">{{ convertStar(c.rarity).star }}</p>
                </div>
              </div>
            </div>
          </template>
          <template v-slot:rollx1
            ><img :src="getRollUrl(this.game, 1)"
          /></template>
          <template v-slot:rollx10
            ><img :src="getRollUrl(this.game, 10)"
          /></template> </base-gacha-template
      ></template>
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
      rollCount: 0,
      rollMaxCount: 0,
      maxStar: 0,
      gachaPool: [],
      currentDraws: [],
      // serverUrl: 'http://localhost:3000',
      serverUrl: "http://171.6.162.180:3000",
      get4StarCount: 0,
      get5StarCount: 0,
    };
  },
  methods: {
    convertStar(rarity){
        let stars = '';
        let color = '';
        for (let i = 0; i < rarity; i++) {
            stars += '✬'
        }
        switch (rarity) {
            case 1:
                color='text-black'
                break;
            case 2:
                color='text-green-500'
                break;
            case 3:
                color='text-blue-500'
                break;
                case 4:
                    color='text-pink-500'
                    break;
                    case 5:
                        color='bg-gradient-to-l from-red-500 via-yellow-500 to-red-500 bg-clip-text text-transparent'
                        break;
            default:
                break;
        }
        return {star: stars, cc: color}
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
      this.currentDraws = [];
      if (this.game === "genshin") {
        for (let i = 0; i < numRoll; i++) {
          const random = Math.floor(Math.random() * 1000);
          let drawpool = null;
          if (random < 3 ) {
            //5 star character
            drawpool = this.gachaPool.filter(
              (p) => p.rarity === 5 && p.type === "Character"
            );
          } else if (random < 6) {
            //5 star weapon
            drawpool = this.gachaPool.filter(
              (p) => p.rarity === 5 && p.type === "Weapon"
            );
          } else if (random < 32) {
            //4 star character
            drawpool = this.gachaPool.filter(
              (p) => p.rarity === 4 && p.type === "Character"
            );
          } else if (random < 58) {
            //4 star weapon
            drawpool = this.gachaPool.filter(
              (p) => p.rarity === 4 && p.type === "Weapon"
            );
          } else {
            //3 star weapon
            drawpool = this.gachaPool.filter((p) => p.rarity === 3);
          }
          const random2 = Math.floor(Math.random() * drawpool.length);
          this.currentDraws.push(drawpool[random2]);
        }
      } else if (this.game === "bluearc") {
        for (let i = 0; i < numRoll; i++) {
          let drawpool = null;
          const random = Math.floor(Math.random() * 1000);
          if (i == numRoll - 1) {
            if (random < 25) {
              drawpool = this.gachaPool.filter((p) => p.rarity === 3);
            } else {
              drawpool = this.gachaPool.filter((p) => p.rarity === 2);
            }
          } else {
            if (random < 25) {
              //3 star
              drawpool = this.gachaPool.filter((p) => p.rarity === 3);
            } else if (random < 210) {
              //2 star
              drawpool = this.gachaPool.filter((p) => p.rarity === 2);
            } else {
              //1 star
              drawpool = this.gachaPool.filter((p) => p.rarity === 1);
            }
          }

          const random2 = Math.floor(Math.random() * drawpool.length);
          // console.log(random)
          this.currentDraws.push(drawpool[random2]);
        }
      } else {
        for (let i = 0; i < numRoll; i++) {
          let drawpool = null;
          const random = Math.floor(Math.random() * 1000);
          if (i == numRoll - 1) {
            if (random < 10) {
              //3 star banner
              drawpool = this.gachaPool.filter(
                (p) => p.rarity === 3 && p.type === "2"
              );
            } else if (random < 30) {
              //3 star out rate
              drawpool = this.gachaPool.filter(
                (p) => p.rarity === 3 && p.type === "1"
              );
            } else {
              drawpool = this.gachaPool.filter((p) => p.rarity === 2);
            }
          } else {
            if (random < 10) {
              //3 star banner
              drawpool = this.gachaPool.filter(
                (p) => p.rarity === 3 && p.type === "2"
              );
            } else if (random < 30) {
              //3 star out of rate
              drawpool = this.gachaPool.filter(
                (p) => p.rarity === 3 && p.type === "1"
              );
            } else if (random < 210) {
              //2 star
              drawpool = this.gachaPool.filter((p) => p.rarity === 2);
            } else {
              //1 star
              drawpool = this.gachaPool.filter((p) => p.rarity === 1);
            }
          }

          const random2 = Math.floor(Math.random() * drawpool.length);
          // console.log(random)
          this.currentDraws.push(drawpool[random2]);
        }
      }
    },
  },
  async created() {
    this.game = this.$route.params.name;
    this.roll = this.$route.params.num;
    this.gachaPool = await this.fetchPool();
    this.draw(this.roll);

    // console.log(this.gachaPool)
  },
};
</script>