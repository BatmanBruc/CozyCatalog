import Vue from 'vue'
import Vuex from 'vuex'
import myStorage from './index.vue'
import backButton from './backButton.js'
import Product from './models/Product';

window.backButton = backButton;
Vue.use(Vuex);

let store = new Vuex.Store({
	state: {
      filter: null,
      nav_open: true
	}
})

// new Vue({
//   el: '#nav',
//   store,
//   render: h => h(Navigation)
// })

// $('#app').html('<div id="header"></div>')
// new Vue({
//   el: '#header',
//   store,
//   render: h => h(Header)
// })

// $('#app').html('<div id="catalog"></div>')
// new Vue({
//   el: '#catalog',
//   store,
//   render: h => h(Catalog)
// })
window.navigation = {
  initMyStorage(){
    $('#app').html('<div id="myStorage"></div>');
    new Vue({
      el: '#app',
      store,
      render: h => h(myStorage)
    })
  },
}
window.navigation.initMyStorage();

window.product = new Product();