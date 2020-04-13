<template>
<div>
<div class="filter">
<div @click="filterSale()" :class="{ 'filter__button--active': filterSaleAct }" class="filter__sale filter__button">Проданные</div>
<div @click="filterNoneSale()" :class="{ 'filter__button--active': filterNoneSaleAct }" class="filter__sale-none filter__button">В наличии</div>
<div @click="filterAll()" :class="{ 'filter__button--active': filterAllACt }" class="filter__all filter__button">Все</div>
</div>
  <ul class="items">
      <item
      v-for="item in items"
      :name="item.name"
      :img="item.img"
      :price="item.price"
      :statusSale="item.statusSale"
      ></item>
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
  name: 'Catalog',
  data () {
    return {
      items: [
        
      ] 
    }
  },
  created(){
  },
  computed: {
    filterSaleAct(){
      if(this.$store.state.filter == 1)
        return true;
      else
        return false;
    },
    filterNoneSaleAct(){
      if(this.$store.state.filter == 0)
        return true;
      else
        return false;
    },
    filterAllACt(){
      if(this.$store.state.filter == null)
        return true;
      else
        return false;
    }
  },
  methods: {
    filterSale(){
      this.$store.state.filter = 1;
    },
    filterNoneSale(){
      this.$store.state.filter = 0;
    },
    filterAll(){
      this.$store.state.filter = null;
    }
  }
}
</script>

<style>
.filter{
  display: flex;
  margin-bottom: 10px;
}
.filter__button {
    display: inline-block;
    width: 100%;
    text-align: center;
    border: 1px solid #ccc;
    margin: 2px;
    border-radius: 3px;
    padding: 4px;
}
ul{
  margin: 0px;
  padding: 0px;
}
.filter__button--active{
  background: #6caffa;
  color: #ffffff;
}
</style>
