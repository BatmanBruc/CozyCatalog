import Vue from 'vue'
import Vuex from 'vuex'
import myStorage from './index.vue'
import backButton from './backButton.js'
import Product from './models/Product';

window.backButton = backButton;
Vue.use(Vuex);
let dispatcher = new Vuex.Store({
	state: {
      updateProducts: false,
      updateFinance: false
	}
})

window.store = new Vuex.Store({
  modules: {
    dispatcher: dispatcher,
	},
	state: {
      filter: null,
      nav_open: true,
      productPage: null,
      searchProduct: []
  },
  mutations: {
    loadSearchProduct(state ,params){
      console.log(params);
      Product.search(params.value, params.filter, params.sort, (result)=> {
        state.searchProduct = result;
        console.log(result);
      })
    }
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

function openModal(){
  $('#modal-wrapper').html('<div id="modal"></div>');
  new Vue({
    el: '#modal-wrapper',
    store,
    render: h => h(myStorage)
  })
}