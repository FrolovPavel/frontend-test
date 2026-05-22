import Vue from 'vue'
import store from './store'

//Main pages
import App from './app.vue'


const app = new Vue({
    el: '#app',
    store,
    components: { App }
});
