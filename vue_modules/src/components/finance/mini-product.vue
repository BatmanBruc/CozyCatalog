<template>
	<div class="mini-product" @click="openPage">
    <div class="mini-product__img"><img :src="img"/></div>
    <div class="mini-product__name">{{ name }}</div>
    <div class="mini-product__price">{{ price }} {{ currency }}</div>
  </div>
</template>

<script>
import Product from '../../models/Product.js';

export default {
  components:{
  },
  name: 'finance',
  props: {
    name: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    },
    img: {
      type: String,
      default: '',
    },
    currency: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  created(){
  },
  computed: {
  },
  methods: {
    openPage(){
      let res = Product.get(this.id);
      res.onsuccess = ()=>{
        this.$store.state.productPage = res.result;
      }
    },
  }
}
</script>

<style>
.mini-list-product {
}
.mini-product {
    border-bottom: 1px solid #cacaca;
    padding: 15px;
    display: flex;
    justify-content: space-between;
}
.mini-product:last-child {
    border-bottom: 0px;
}
.mini-product__img{
    display: inline-block;
    width: 30px;
}
.mini-product__img img{
    width: 100%;
}
.mini-product__name {
    display: inline-block;
    color: #686868;
}
.mini-product__price {
    display: inline-block;
    text-align: end;
    color: #686868;
}
</style>
