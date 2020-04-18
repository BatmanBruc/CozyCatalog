<template>
	<div class="navigation-admin" v-bind:class="{ active: active }">
    <ul>
      <!--<li class="navigation-admin_item">Каталог</li>-->
      <li class="navigation-admin_item" @click="openPage('search')">Каталог</li>
      <li class="navigation-admin_item" @click="openPage('adminPanel')">Управление</li>
      <li class="navigation-admin_item" @click="openPage('finance')">Финансы</li>
      <!--<li class="navigation-admin_item">Настройки</li>-->
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
.navigation-admin {
    position: fixed;
    width: 100%;
    height: 100%;
    background: white;
    left: 0px;
    top: 0px;
    display: none;
}
.navigation-admin ul {
    padding: 10px;
}
li.navigation-admin_item {
    font-size: 19px;
    border: 1px solid #ccc;
    margin-bottom: 5px;
    padding: 5px;
    border-radius: 3px;
}
.navigation-admin.active{
  display: block;
}
</style>
