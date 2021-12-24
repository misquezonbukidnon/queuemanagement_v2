import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' //Vuesax styles

import 'material-icons/iconfont/material-icons.css';

Vue.use(Vuesax, {
    // options here
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')