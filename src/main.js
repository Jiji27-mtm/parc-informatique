import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

// On crée l'application, on branche le routeur et on l'affiche dans #app
createApp(App).use(router).mount('#app')
