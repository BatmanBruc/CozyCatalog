<template>
	<div class="navigation" v-bind:class="{ active: active }">
    <ul>
      <li class="navigation_item">Каталог</li>
      <li class="navigation_item" @click="openPage('search')">Поиск</li>
      <li class="navigation_item" @click="openPage('adminPanel')">Управление</li>
      <li class="navigation_item">Настройки</li>
    </ul>
  </div>
</template>



<script>
import axios from 'axios';
export default {
  components:{
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
        open: true
    }
  },
  created(){
  },
  computed: {
  },
  methods: {
      openPage(val){
          this.$emit('openPage',val);
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
