<template>
<li v-if="filter" class="product">
  <div class="product__box-img" @click="openPage"><img class="product__img" :src="file" alt=""></div>
  <div class="product__box-info">
    <div class="product__name" @click="openPage">{{ name }}</div>
    <div :class="{ 'product__status--sales' : statusSale}" class="product__status">{{ statusSale ? 'Продано' : 'В наличии' }}</div>
    <div class="product__price">{{ price }} {{ currency }}</div>
  </div>
  <div class="product__box-buttons">
    <div v-if="!statusSale" class="product__box-button product__box-button--sale" @click="sale()">
      Продать
    </div>
    <div v-if="statusSale" class="product__box-button product__box-button--return" @click="reeturn()">
      Вернуть
    </div>
  </div>
</li>
</template>

<script>

import Product from '../models/Product.js';
import {productPageMixin} from '../mixins/product-page.js';

export default {
  name: 'product',
  mixins: [productPageMixin],
  props: {
    id: {
      type: Number,
      default: null,
    },
    name: {
      type: String,
      default: '',
    },
    file: {
      type: String,
      default: '',
    },
    statusSale: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      default: 0,
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
  computed: {
    filter(){
      if(this.$store.state.filter == null)
        return true;
      return this.$store.state.filter == this.statusSale ? true : false;
    }
  },
  methods: {
    sale(){
      this.statusSale = true;
      Product.change(this.id, {
        statusSale: this.statusSale,
      },()=>{
        this.$emit('sale');
        this.$store.state.dispatcher.updateFinance = true;
      });
    },
    openPage(){
      let res = Product.get(this.id);
      res.onsuccess = ()=>{
        this.$store.state.productPage = res.result;
      }
      this.$store.state.productPage = {
        id: this.id,
        name: this.name,
        file: this.file,
        statusSale: this.statusSale,
        price: this.price
      };
    },
    reeturn(){
      this.statusSale = false;
      Product.change(this.id, {
        statusSale: this.statusSale,
      },()=>{
        this.$emit('sale');
        this.$store.state.dispatcher.updateFinance = true;
      });
    }
  }
}
</script>

<style>
li.product {
    display: block;
    display: flex;
    width: 100%;
    margin: 0;
    margin-bottom: 20px;
    background: #ffffff;
    height: 50px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
}
li.product:last-child {
    border-bottom: 0px;
}
.product__box-img {
    min-width: 95px;
    height: 50px;
    text-align: center;
}

img.product__img {
    height: 100%;
}
.product__box-info {
    margin-left: 2px;
    width: 100%;
    padding: 0px;
    height: 50px;
}
.product__name {
    color: #000000;
    margin-left: 10px;
    margin-top: 5px;
}
.product__price {
    font-size: 12px;
    margin-top: 5px;
    margin-left: 10px;
}
.product__status {
    color: #03ba0c;
    display: none;
}
.product__status--sales{
  color: red;
}
.product__box-button {
        padding: 10px;
    height: 100%;
    padding: 0 5px;
    font-size: 14px;
    border-radius: 24px;
    line-height: 50px;
    width: 73px;
    text-align: center;
    height: 50px;
}
.product__box-button--sale{
    background: #00c4ff;
    color: #fff;
}
.product__box-button--return{
  border: 1px solid #ccc;
}
</style>
