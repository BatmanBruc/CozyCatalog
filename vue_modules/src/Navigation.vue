<template>
	<div class="navigation" v-bind:class="{ active: open }">
    <ul>
      <li class="navigation_item">Магазины</li>
      <li class="navigation_item">Поиск</li>
      <li class="navigation_item" @click="myStorage">Мой магазин</li>
    </ul>
  </div>
</template>



<script>
import item from './item';
import axios from 'axios';
export default {
  components:{
    item: item
  },
  name: 'Search',
  data () {
    return {
      open: true
    }
  },
  created(){
  },
  computed: {
    open(){
    }
  },
  methods: {
    myStorage(){
      this.open = false;
      window.navigation.initMyStorage();
    }
  }
}
</script>

<style>
.navigation {
    position: fixed;
    width: 100%;
    height: 100%;
    background: white;
    left: 0px;
    top: 0px;
    display: none;
}
.navigation.active{
  display: block;
}
.navigation ul {
    padding: 10px;
}
li.navigation_item {
    font-size: 19px;
    border: 1px solid #ccc;
    margin-bottom: 5px;
    padding: 5px;
    border-radius: 3px;
}
</style>
