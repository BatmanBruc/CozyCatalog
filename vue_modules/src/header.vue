<template>
    <div class="header">
        <div class="header__icon-back" @click="back()"><</div>
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
    },
    back(){
        window.backButton();
    }
  }
}
</script>

<style>
.header {
    height: 40px;
    border-top: 1px solid #d6d6d6;
    position: fixed;
    bottom: 0px;
    z-index: 2;
    width: 100%;
}
.header__icon-back {
    width: 40px;
    height: 34px;
    text-align: center;
    line-height: 34px;
    font-size: 30px;
    color: #b9b9b9;
    border-right: 1px solid #e4e4e4;
    margin-top: 3px;
}
</style>
