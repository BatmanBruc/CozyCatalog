import Vue from 'vue'
import Vuex from 'vuex'
import Catalog from './Catalog.vue'
import Search from './Search.vue'
import Navigation from './Navigation.vue'
import myStorage from './myStorage/index.vue'



Vue.use(Vuex);

let store = new Vuex.Store({
	state: {
      filter: null,
      nav_open: true
	}
})

new Vue({
  el: '#nav',
  store,
  render: h => h(Navigation)
})
$('#app').html('<div id="catalog"></div>')
new Vue({
  el: '#catalog',
  store,
  render: h => h(Catalog)
})
window.navigation = {
  initMyStorage(){
    $('#app').html('<div id="myStorage"></div>');
    store.state.nav_open = false;
    new Vue({
      el: '#app',
      store,
      render: h => h(myStorage)
    })
  },
}
