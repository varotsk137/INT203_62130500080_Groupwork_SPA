import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import BaseContainer from './components/BaseContainer.vue'
import TheGameBanner from './components/TheGameBanner.vue'
import BaseGachaTemplate from './components/BaseGachaTemplate.vue'

const app = createApp(App)
app.use(router)
app.component('base-container',BaseContainer)
app.component('the-game-banner',TheGameBanner)
app.component('base-gacha-template',BaseGachaTemplate)
app.mount('#app')
