<template>
	<div class="navigation-admin" v-bind:class="{ active: active }">
    <ul>
      <!--<li class="navigation-admin_item">Каталог</li>-->
      <li class="navigation-admin_item" v-bind:class="{ active: activePage == 'search' }" @click="openPage('search')"><lupa /></li>
      <li class="navigation-admin_item" v-bind:class="{ active: activePage == 'adminPanel' }" @click="openPage('adminPanel')">+</li>
      <li class="navigation-admin_item" v-bind:class="{ active: activePage == 'finance' }" @click="openPage('finance')"><coins /></li>
      <!--<li class="navigation-admin_item">Настройки</li>-->
    </ul>
  </div>
</template>



<script>
import axios from 'axios';
import lupa from './../assept/icons/lupa.vue'
import iconList from './../assept/icons/list.vue'
import finance from './../assept/icons/finance.vue'
import coins from './../assept/icons/coins.vue'
export default {
  components:{
    iconList,
    coins,
    lupa
  },
  name: 'Search',
  props: {
    active: {
        type: Boolean,
        default: true
    },
  },
  data () {
    return {
        activePage: null
    }
  },
  created(){
  },
  computed: {
  },
  methods: {
      openPage(val){
          this.activePage = val;
          this.$emit('openPage',val);
      }
  }
}
</script>

<style>
.navigation-admin {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #fff;
    left: 0;
    bottom: 0;
    display: none;
    width: 100%;
    height: auto;
    text-align: center;
    border-top: 1px solid #e7e7e7;
}
.navigation-admin ul {
    padding: 10px;
    margin: 0px;
}
li.navigation-admin_item {
    font-size: 50px;
    margin-bottom: 5px;
    padding: 5px;
    color: #adadad;
    border-radius: 3px;
    width: 30px;
    padding-left: 3px;
    height: 30px;
    text-align: center;
    line-height: 26px;
    display: inline-block;
    margin: 0px 20px;
    background: white;
}
.navigation-admin.active{
  display: block;
}
li.navigation-admin_item svg {
    width: 100%;
    height: 100%;
}
li.navigation-admin_item svg g{
  fill: #adadad;
}
.navigation-admin_item.active svg g{
  fill: #00c4ff;
}
.navigation-admin_item.active{
  color: #00c4ff;
} 
</style>
